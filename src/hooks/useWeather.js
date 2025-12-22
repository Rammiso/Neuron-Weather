import { useState, useEffect } from 'react';

const useWeather = (search) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "89f7b196dd5942f993590614250804";

  useEffect(() => {
    const fetchWeather = async () => {
      // Only fetch if we have a valid search term
      if (!search || search.length < 2) {
        setData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(search)}&days=7&aqi=yes&alerts=yes`
        );

        if (!response.ok) {
          if (response.status === 400) {
            throw new Error(`Location "${search}" not found. Please check the spelling and try again.`);
          } else if (response.status === 401) {
            throw new Error('API key error. Please check your configuration.');
          } else if (response.status === 403) {
            throw new Error('API access denied. Please check your subscription.');
          } else {
            throw new Error(`Weather service unavailable (${response.status}). Please try again later.`);
          }
        }

        const weatherData = await response.json();
        setData(weatherData);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    // Only debounce if search is coming from direct typing
    // For location selection, fetch immediately
    const timeoutId = setTimeout(fetchWeather, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return { data, loading, error };
};

export default useWeather;