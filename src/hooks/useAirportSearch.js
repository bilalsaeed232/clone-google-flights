import { useState } from 'react';
import axios from 'axios';

export const useAirportSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [airports, setAirports] = useState([]);

  const searchAirports = async (query) => {
    if (!query || query.length < 2) {
      setAirports([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport', {
        params: { query },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
      });

      const searchResult = response.data ?? {};
      console.log(searchResult);

      const formattedAirports = searchResult.data?.map(airport => {
        const { title, subtitle } = airport.presentation ?? {};
        
        return { 
          label: `${title ?? 'Unknown'}, (${subtitle ?? 'Unknown'})`,
          skyId: airport.skyId ?? '',
          entityId: airport.entityId ?? '',
          iata: airport.iata ?? ''
        };
      }) ?? [];

      console.log("Formatted Airports", formattedAirports);

      setAirports(formattedAirports);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to search airports');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    airports,
    searchAirports
  };
}; 