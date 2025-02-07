import { useState, useCallback } from 'react';
import axios from 'axios';

export const useFlightDetails = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [flightDetails, setFlightDetails] = useState(null);

    const getFlightDetails = useCallback(async (itineraryId, legs, sessionId, adults = 1, currency = 'USD', locale = 'en-US', market = 'en-US', cabinClass = 'economy', countryCode = 'US') => {
        setLoading(true);
        setError(null);

        console.log("Flight Details Params:", {
            itineraryId,
            sessionId,
            legs
        });

        try {
            const response = await axios.get('https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails', {
                params: {
                    sessionId: encodeURIComponent(sessionId ?? ''),
                    legs: encodeURIComponent(JSON.stringify(legs ?? [])),
                    itineraryId: encodeURIComponent(itineraryId ?? ''),
                    adults: encodeURIComponent(adults.toString()),
                    currency: encodeURIComponent(currency),
                    locale: encodeURIComponent(locale),
                    market: encodeURIComponent(market),
                    cabinClass: encodeURIComponent(cabinClass),
                    countryCode: encodeURIComponent(countryCode)
                },
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
                }
            });

            console.log("Flight Details Response:", response.data);

            if (!response.data?.data?.itinerary) {
                console.dir(response.data);
                throw new Error('Invalid flight details data');
            }

            const details = response.data.data.itinerary;
            setFlightDetails({
                price: details.pricingOptions?.[0]?.totalPrice ?? 'N/A',
                agents: details.pricingOptions?.map(option => option.agents.map(agent => ({
                    name: agent.name ?? 'Unknown',
                    price: agent.price ?? 'N/A',
                    rating: agent.rating?.value ?? 'N/A',
                    bookingUrl: agent.url ?? ''
                }))).flat() ?? [],
                legs: details.legs?.map(leg => ({
                    id: leg.id,
                    departure: {
                        time: leg.departure ?? 'Unknown',
                        airport: leg.origin?.name ?? 'Unknown',
                        code: leg.origin?.displayCode ?? 'Unknown',
                        city: leg.origin?.city ?? 'Unknown'
                    },
                    arrival: {
                        time: leg.arrival ?? 'Unknown',
                        airport: leg.destination?.name ?? 'Unknown',
                        code: leg.destination?.displayCode ?? 'Unknown',
                        city: leg.destination?.city ?? 'Unknown'
                    },
                    duration: leg.duration ?? 0,
                    stops: leg.stopCount ?? 0,
                    flightNumber: leg.segments?.[0]?.flightNumber ?? 'Unknown',
                    carrier: {
                        name: leg.segments?.[0]?.marketingCarrier?.name ?? 'Unknown',
                        logo: leg.segments?.[0]?.marketingCarrier?.logo ?? ''
                    }
                })) ?? [],
                destinationImage: details.destinationImage ?? ''
            });

            return details;
        } catch (err) {
            setError(err.message ?? 'Failed to fetch flight details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, flightDetails, getFlightDetails };
};
