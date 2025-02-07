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
          originSkyId: origin.skyId,
          originEntityId: origin.entityId,
          destinationSkyId: destination.skyId,
          destinationEntityId: destination.entityId,
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

      const transformedFlights = response.data.data.itineraries.map(itinerary => ({
        id: itinerary.id,
        price: itinerary.price.formatted,
        outbound: {
          departure: itinerary.legs[0].departure,
          arrival: itinerary.legs[0].arrival,
          duration: itinerary.legs[0].durationInMinutes,
          stops: itinerary.legs[0].stopCount,
          airline: itinerary.legs[0].carriers.marketing[0].name,
          airlineLogo: itinerary.legs[0].carriers.marketing[0].logoUrl
        },
        ...(itinerary.legs[1] && {
          return: {
            departure: itinerary.legs[1].departure,
            arrival: itinerary.legs[1].arrival,
            duration: itinerary.legs[1].durationInMinutes,
            stops: itinerary.legs[1].stopCount,
            airline: itinerary.legs[1].carriers.marketing[0].name,
            airlineLogo: itinerary.legs[1].carriers.marketing[0].logoUrl
          }
        }),
        tags: itinerary.tags
      }));

      // Add filterStats to the first flight
      if (transformedFlights.length > 0) {
        transformedFlights[0].filterStats = response.data.data.filterStats;
      }

      setFlights(transformedFlights);
      return transformedFlights;
    } catch (err) {
      setError('Failed to search flights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, flights, searchFlights };
}; 