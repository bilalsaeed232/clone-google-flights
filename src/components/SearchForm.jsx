import React, { useState } from 'react'
import { Box, Button, Container, TextField, Alert, Autocomplete } from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useAirportSearch } from '../hooks/useAirportSearch';
import { useFlightSearch } from '../hooks/useFlightSearch';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    departureDate: null,
    returnDate: null
  });
  
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const { 
    loading: originLoading, 
    airports: originAirports, 
    searchAirports: searchOriginAirports 
  } = useAirportSearch();

  const { 
    loading: destinationLoading, 
    airports: destinationAirports, 
    searchAirports: searchDestinationAirports 
  } = useAirportSearch();

  const {
    loading: flightSearchLoading,
    error: flightSearchError,
    searchFlights
  } = useFlightSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOrigin || !selectedDestination || !formData.departureDate) {
      return;
    }

    if (formData.returnDate && formData.returnDate < formData.departureDate) {
      return;
    }

    const flights = await searchFlights({
      origin: selectedOrigin,
      destination: selectedDestination,
      ...formData
    });

    if (flights) {
      onSearch(flights);
    }
  };

  return (
    <Container>
      {flightSearchError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {flightSearchError}
        </Alert>
      )}
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, flexWrap: "wrap", my: 4 }}
      >
        <Autocomplete
          options={originAirports}
          value={selectedOrigin}
          onChange={(_, newValue) => setSelectedOrigin(newValue)}
          onInputChange={(_, newValue) => searchOriginAirports(newValue)}
          loading={originLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Origin"
              sx={{ width: 220 }}
            />
          )}
        />
        <Autocomplete
          options={destinationAirports}
          value={selectedDestination}
          onChange={(_, newValue) => setSelectedDestination(newValue)}
          onInputChange={(_, newValue) => searchDestinationAirports(newValue)}
          loading={destinationLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Destination"
              sx={{ width: 220 }}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Departure Date"
            value={formData.departureDate}
            onChange={(newValue) => setFormData(prev => ({ ...prev, departureDate: newValue }))}
            renderInput={(params) => <TextField required {...params} />}
          />
          <DatePicker
            label="Return Date"
            value={formData.returnDate}
            onChange={(newValue) => setFormData(prev => ({ ...prev, returnDate: newValue }))}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button 
          type="submit" 
          variant='contained'
          disabled={flightSearchLoading}
          sx={{ minWidth: '120px' }}
        >
          {flightSearchLoading ? 'Searching...' : 'Search Flights'}
        </Button>
      </Box>
    </Container>
  )
}

export default SearchForm