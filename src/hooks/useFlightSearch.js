import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export const useFlightSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flights, setFlights] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  const searchFlights = async (searchParams) => {
    const { origin, destination, departureDate, returnDate } = searchParams;

    if (!origin || !destination || !departureDate) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    console.log("origin", origin);


    try {
      const response = await axios.get('https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights', {
        params: {
          originSkyId: encodeURIComponent(origin?.skyId ?? ''),
          originEntityId: encodeURIComponent(origin?.entityId ?? ''),
          destinationSkyId: encodeURIComponent(destination?.skyId ?? ''),
          destinationEntityId: encodeURIComponent(destination?.entityId ?? ''),
          date: encodeURIComponent(format(departureDate, 'yyyy-MM-dd')),
          returnDate: returnDate ? encodeURIComponent(format(returnDate, 'yyyy-MM-dd')) : null,
          adults: '1',
          currency: 'USD'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
      });

      const newSessionId = response.data?.sessionId ?? null;
      console.log("newSessionId", newSessionId);
      setSessionId(newSessionId);

      const transformedFlights = response.data?.data?.itineraries?.map(itinerary => ({
        id: itinerary.id,
        price: itinerary.price?.formatted ?? 'N/A',
        outbound: {
          departure: itinerary.legs?.[0]?.departure ?? 'Unknown',
          arrival: itinerary.legs?.[0]?.arrival ?? 'Unknown',
          duration: itinerary.legs?.[0]?.durationInMinutes ?? 0,
          stops: itinerary.legs?.[0]?.stopCount ?? 0,
          airline: itinerary.legs?.[0]?.carriers?.marketing?.[0]?.name ?? 'Unknown',
          airlineLogo: itinerary.legs?.[0]?.carriers?.marketing?.[0]?.logoUrl ?? ''
        },
        ...(itinerary.legs?.[1] && {
          return: {
            departure: itinerary.legs[1]?.departure ?? 'Unknown',
            arrival: itinerary.legs[1]?.arrival ?? 'Unknown',
            duration: itinerary.legs[1]?.durationInMinutes ?? 0,
            stops: itinerary.legs[1]?.stopCount ?? 0,
            airline: itinerary.legs[1]?.carriers?.marketing?.[0]?.name ?? 'Unknown',
            airlineLogo: itinerary.legs[1]?.carriers?.marketing?.[0]?.logoUrl ?? ''
          }
        }),
        tags: itinerary.tags ?? []
      })) ?? [];

      if (transformedFlights.length > 0) {
        transformedFlights[0].filterStats = response.data?.data?.filterStats ?? {};
      }

      setFlights(transformedFlights);
      return { flights: transformedFlights, sessionId: newSessionId };
    } catch (err) {
      setError(err.message ?? 'Failed to search flights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, flights, searchFlights, sessionId };
}; 