import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export const useFlightSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flights, setFlights] = useState([]);

  const searchFlights = async (searchParams) => {
    const { origin, destination, departureDate, returnDate } = searchParams;

    if (!origin || !destination || !departureDate) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights', {
        params: {
          originSkyId: origin.entityId,
          destinationSkyId: destination.entityId,
          date: format(departureDate, 'yyyy-MM-dd'),
          returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : null,
          adults: '1',
          currency: 'USD'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
      });

      const transformedFlights = response.data.data.map(flight => ({
        airline: flight.airline,
        price: flight.price.amount,
        duration: flight.duration,
        stops: flight.stops
      }));

      setFlights(transformedFlights);
      return transformedFlights;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search flights');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    flights,
    searchFlights
  };
}; 