import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const FlightResults = ({ flights }) => {
  return (
    <Box sx={{my: 4}}>
        <Typography variant="h6">Flight Results</Typography>
        <List>
            {flights.map((flight, index) => (
                <ListItem key={index}>
                    <ListItemText
                        primary={`${flight.airline} - $${flight.price}`}
                        secondary= {`Duration: ${flight.duration}, Stops: ${flight.stops}`}
                    />
                </ListItem>
            ))}
        </List>
    </Box>
  )
};


export default FlightResults;