import { Box, List, ListItem, Typography, Avatar, Chip } from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const FlightResults = ({ flights, legs, sessionId }) => {
  const navigate = useNavigate();

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'HH:mm');
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'EEE, MMM d');
  };

  const handleFlightClick = (flightId) => {
    navigate(`/flight/${flightId}`, { state: { legs: legs ?? [], sessionId: sessionId ?? '' } });
  };

  return (
    <Box sx={{ my: 4, maxWidth: '850px' }}>
      {flights && flights.length > 0 ? (
        <List sx={{ p: 0 }}>
          {flights.map((flight) => (
            <ListItem
              key={flight.id}
              onClick={() => handleFlightClick(flight.id)}
              sx={{
                p: 3,
                mb: 1,
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #dadce0',
                '&:hover': {
                  boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
                  cursor: 'pointer',
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                {/* Price and Best Tags */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#1a73e8' }}>
                    {flight.price ?? 'N/A'}
                  </Typography>
                  <Box>
                    {flight.tags?.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag.replace(/_/g, ' ')}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: tag.includes('cheapest') ? '#e8f0fe' : '#f1f3f4',
                          color: tag.includes('cheapest') ? '#1967d2' : '#202124',
                          textTransform: 'capitalize',
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Outbound Flight */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: flight.return ? 3 : 0 }}>
                  <Avatar
                    src={flight.outbound?.airlineLogo ?? ''}
                    alt={flight.outbound?.airline ?? 'Unknown'}
                    sx={{ width: 32, height: 32, mr: 2 }}
                  />
                  <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#202124' }}>
                        {formatDateTime(flight.outbound?.departure ?? '')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(flight.outbound?.departure ?? '')}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {formatDuration(flight.outbound?.duration ?? 0)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ flex: 1, borderBottom: '1px solid #dadce0', height: 0 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                          {flight.outbound?.stops === 0 ? 'Nonstop' : 
                            `${flight.outbound?.stops ?? 0} stop${flight.outbound?.stops > 1 ? 's' : ''}`}
                        </Typography>
                        <Box sx={{ flex: 1, borderBottom: '1px solid #dadce0', height: 0 }} />
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#202124' }}>
                        {formatDateTime(flight.outbound?.arrival ?? '')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(flight.outbound?.arrival ?? '')}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Return Flight */}
                {flight.return && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={flight.return?.airlineLogo ?? ''}
                      alt={flight.return?.airline ?? 'Unknown'}
                      sx={{ width: 32, height: 32, mr: 2 }}
                    />
                    <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#202124' }}>
                          {formatDateTime(flight.return?.departure ?? '')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(flight.return?.departure ?? '')}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatDuration(flight.return?.duration ?? 0)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Box sx={{ flex: 1, borderBottom: '1px solid #dadce0', height: 0 }} />
                          <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                            {flight.return?.stops === 0 ? 'Nonstop' : 
                            `${flight.return?.stops ?? 0} stop${flight.return?.stops > 1 ? 's' : ''}`}
                          </Typography>
                          <Box sx={{ flex: 1, borderBottom: '1px solid #dadce0', height: 0 }} />
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#202124' }}>
                          {formatDateTime(flight.return?.arrival ?? '')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(flight.return?.arrival ?? '')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <Typography variant="h6" color="textSecondary">
            No flights available. Try adjusting your search filters.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FlightResults;