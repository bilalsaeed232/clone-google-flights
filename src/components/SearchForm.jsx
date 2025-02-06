import React, { useState } from 'react'
import { Box, Button, Container, TextField } from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: null,
    returnDate: null
  });

  const handleChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  return (
    <Container>
      <Box 
        component="form" 
        sx={{ display: "flex", gap: 2, flexWrap: "wrap", my: 4 }}
      >
        <TextField
          required
          label="Origin"
          value={formData.origin}
          onChange={(e) => handleChange('origin')(e.target.value)}
        />
        <TextField
          required
          label="Destination"
          value={formData.destination}
          onChange={(e) => handleChange('destination')(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Departure Date"
            value={formData.departureDate}
            onChange={handleChange('departureDate')}
            renderInput={(params) => <TextField required {...params} />}
          />
          <DatePicker
            label="Return Date"
            value={formData.returnDate}
            onChange={handleChange('returnDate')}
            renderInput={(params) => <TextField required {...params} />}
          />
        </LocalizationProvider>
        <Button 
          type="submit" 
          variant='contained'
          sx={{ minWidth: '120px' }}
          onClick={onSearch}
        >
          Search Flights
        </Button>

      </Box>
    </Container>
  )
}

export default SearchForm