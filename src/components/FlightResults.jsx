import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const FlightResults = () => {
  return (
    <Box sx={{my: 4}}>
        <Typography variant="h6">Flight Results</Typography>
        <List>
            <ListItem>
                <ListItemText
                    primary="Flight 1"
                    secondary="Departure: 10:00 AM, Arrival: 12:00 PM"
                />
            </ListItem>
        </List>
    </Box>

  )
};


export default FlightResults;