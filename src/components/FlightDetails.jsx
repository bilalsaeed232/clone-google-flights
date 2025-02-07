import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
    Box, 
    Typography, 
    Paper, 
    Divider, 
    Button, 
    CircularProgress,
    Alert,
    Avatar
} from '@mui/material';
import { format } from 'date-fns';
import { useFlightDetails } from '../hooks/useFlightDetails';
import FlightIcon from '@mui/icons-material/Flight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LuggageIcon from '@mui/icons-material/Luggage';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FlightDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, error, flightDetails, getFlightDetails } = useFlightDetails();

    console.log("location", location);

    useEffect(() => {
        if (id) {
            const legs = location.state?.legs ?? [];
            const sessionId = location.state?.sessionId ?? '';
            getFlightDetails(id, legs, sessionId);
        }
    }, [id, getFlightDetails, location.state]);

    const formatDateTime = (dateString) => {
        return format(new Date(dateString), 'EEE, MMM d • HH:mm');
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!flightDetails) {
        return null;
    }

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
            <Button 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Back to results
            </Button>

            <Paper elevation={0} sx={{ p: 3, border: '1px solid #dadce0' }}>
                {/* Price and Booking Section */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Box>
                        <Typography variant="h4" sx={{ color: '#1a73e8' }}>
                            {flightDetails.price?.formatted ?? 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total price for all travelers
                        </Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        size="large"
                        sx={{ 
                            bgcolor: '#1a73e8',
                            '&:hover': {
                                bgcolor: '#1557b0'
                            }
                        }}
                    >
                        Select this fare
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Flight Legs */}
                {flightDetails.legs?.map((leg, index) => (
                    <Box key={leg.id} sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {index === 0 ? 'Outbound' : 'Return'} Flight
                        </Typography>

                        {/* Airline Info */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                            <Avatar 
                                src={leg.carrier?.logo ?? ''}
                                alt={leg.carrier?.name ?? 'Unknown'}
                                sx={{ width: 32, height: 32 }}
                            />
                            <Box>
                                <Typography variant="subtitle1">
                                    {leg.carrier?.name ?? 'Unknown'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Flight {leg.carrier?.flightNumber ?? 'Unknown'}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Flight Timeline */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">
                                    {formatDateTime(leg.departure?.time ?? '')}
                                </Typography>
                                <Typography variant="body1">
                                    {leg.departure?.airport ?? 'Unknown'}
                                    {leg.departure?.terminal && ` • Terminal ${leg.departure.terminal}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {leg.departure?.city ?? 'Unknown'}
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center'
                            }}>
                                <AccessTimeIcon color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    {formatDuration(leg.duration ?? 0)}
                                </Typography>
                                <FlightIcon 
                                    sx={{ 
                                        transform: 'rotate(90deg)',
                                        color: 'action.active'
                                    }} 
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {leg.stops === 0 ? 'Nonstop' : 
                                     `${leg.stops ?? 0} stop${leg.stops > 1 ? 's' : ''}`}
                                </Typography>
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">
                                    {formatDateTime(leg.arrival?.time ?? '')}
                                </Typography>
                                <Typography variant="body1">
                                    {leg.arrival?.airport ?? 'Unknown'}
                                    {leg.arrival?.terminal && ` • Terminal ${leg.arrival.terminal}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {leg.arrival?.city ?? 'Unknown'}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Baggage Info */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            bgcolor: '#f8f9fa',
                            p: 2,
                            borderRadius: 1
                        }}>
                            <LuggageIcon color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {flightDetails.baggageInfo ?? 'Baggage information unavailable'}
                            </Typography>
                        </Box>
                    </Box>
                ))}

                {/* Fare Rules */}
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Fare Rules
                </Typography>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Changes
                        </Typography>
                        <Typography>
                            {flightDetails.farePolicy?.isChangeAllowed ? 'Allowed' : 'Not allowed'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Cancellation
                        </Typography>
                        <Typography>
                            {flightDetails.farePolicy?.isCancellationAllowed ? 'Allowed' : 'Not allowed'}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default FlightDetails; 