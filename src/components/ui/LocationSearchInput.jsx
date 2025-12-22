import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Loader2, 
  X,
  Navigation
} from 'lucide-react';

const LocationSearchInput = ({ onLocationSelect, placeholder }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  const apiKey = "89f7b196dd5942f993590614250804";

  // Debounced search function
  const searchLocations = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const locations = await response.json();
      setSuggestions(locations.slice(0, 8)); // Limit to 8 suggestions
      setShowSuggestions(locations.length > 0);
    } catch (error) {
      console.error('Location search error:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debouncing
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchLocations(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleLocationSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        // No action needed for other keys
        break;
    }
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    const locationName = `${location.name}, ${location.country}`;
    setQuery(locationName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onLocationSelect(location.name); // Pass just the city name to the weather API
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={suggestionsRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-neon-cyan animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-neon-cyan" />
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder || "Search for a city..."}
          className="w-full pl-12 pr-12 py-4 cyber-input text-lg font-mono placeholder-gray-500 focus:ring-2 focus:ring-neon-cyan/30"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 glass border border-cyber-border/50 rounded-xl overflow-hidden z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {suggestions.map((location, index) => (
                <motion.button
                  key={`${location.name}-${location.country}-${location.region}`}
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full px-4 py-3 text-left hover:bg-neon-cyan/10 transition-colors border-b border-cyber-border/30 last:border-b-0 ${
                    index === selectedIndex ? 'bg-neon-cyan/10' : ''
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-neon-green flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-200 truncate">
                          {location.name}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400 truncate">
                          {location.region}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Navigation className="w-3 h-3 text-gray-500" />
                        <span className="font-mono text-xs text-gray-500">
                          {location.country}
                        </span>
                        {location.lat && location.lon && (
                          <>
                            <span className="text-gray-600">•</span>
                            <span className="font-mono text-xs text-gray-600">
                              {location.lat.toFixed(2)}°, {location.lon.toFixed(2)}°
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 bg-cyber-card/50 border-t border-cyber-border/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-gray-500 uppercase">
                  {suggestions.length} location{suggestions.length !== 1 ? 's' : ''} found
                </span>
                <span className="font-mono text-gray-600">
                  Use ↑↓ to navigate, Enter to select
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results message */}
      <AnimatePresence>
        {showSuggestions && suggestions.length === 0 && query.length >= 2 && !isLoading && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 glass border border-cyber-border/50 rounded-xl p-4 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400 mb-1">No locations found</p>
              <p className="font-mono text-xs text-gray-500">
                Try a different search term
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSearchInput;