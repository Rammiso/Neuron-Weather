import { useState, useEffect } from 'react';

const useWeather = (search) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "89f7b196dd5942f993590614250804";

  useEffect(() => {
    const fetchWeather = async () => {
      if (search.length < 3) {
        setData(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${search}&days=7`
        );

        if (!response.ok) {
          throw new Error('Weather data not found');
        }

        const weatherData = await response.json();
        setData(weatherData);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchWeather, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return { data, loading, error };
};

export default useWeather;