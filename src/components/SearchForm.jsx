import React, { useState } from 'react'
import { Box, Button, TextField, Alert, Autocomplete } from '@mui/material'
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
  const [validationError, setValidationError] = useState(null);

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
    setValidationError(null);

    if (!selectedOrigin || !selectedDestination) {
      setValidationError('Please select both origin and destination airports');
      return;
    }

    if (!formData.departureDate) {
      setValidationError('Please select a departure date');
      return;
    }

    if (formData.returnDate && formData.returnDate < formData.departureDate) {
      setValidationError('Return date cannot be before departure date');
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
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        borderBottom: '1px solid #dadce0',
        mb: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <Autocomplete
          options={originAirports}
          value={selectedOrigin}
          onChange={(_, newValue) => {
            setSelectedOrigin(newValue);
            setValidationError(null);
          }}
          onInputChange={(_, newValue) => searchOriginAirports(newValue)}
          loading={originLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Origin"
              sx={{ width: 220 }}
              error={validationError && !selectedOrigin}
            />
          )}
        />
        <Autocomplete
          options={destinationAirports}
          value={selectedDestination}
          onChange={(_, newValue) => {
            setSelectedDestination(newValue);
            setValidationError(null);
          }}
          onInputChange={(_, newValue) => searchDestinationAirports(newValue)}
          loading={destinationLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Destination"
              sx={{ width: 220 }}
              error={validationError && !selectedDestination}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Departure Date"
            value={formData.departureDate}
            onChange={(newValue) => {
              setFormData(prev => ({ ...prev, departureDate: newValue }));
              setValidationError(null);
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                required 
                error={validationError && !formData.departureDate}
              />
            )}
          />
          <DatePicker
            label="Return Date"
            value={formData.returnDate}
            onChange={(newValue) => {
              setFormData(prev => ({ ...prev, returnDate: newValue }));
              setValidationError(null);
            }}
            renderInput={(params) => (
              <TextField 
                {...params}
                error={validationError && formData.returnDate && formData.returnDate < formData.departureDate}
              />
            )}
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
      {(validationError || flightSearchError) && (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', px: 3, pb: 2 }}>
          <Alert severity="error">
            {validationError || flightSearchError}
          </Alert>
        </Box>
      )}
    </Box>
  )
}

export default SearchForm