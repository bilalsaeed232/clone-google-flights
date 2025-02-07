import { useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';
import Filters from './components/Filters';
import { Box } from '@mui/material';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    stops: 'any',
    airlines: []
  });

  const handleSearch = (searchResults) => {
    setFlights(searchResults);
    // Update price range based on actual flight prices
    if (searchResults?.length > 0) {
      const prices = searchResults.map(flight => parseFloat(flight.price.replace('$', '')));
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      setFilters(prev => ({
        ...prev,
        priceRange: [minPrice, maxPrice]
      }));
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredFlights = flights.filter(flight => {
    const price = parseFloat(flight.price.replace('$', ''));
    const withinPriceRange = price >= filters.priceRange[0] && price <= filters.priceRange[1];
    
    let matchesStops = true;
    if (filters.stops === 'nonstop') {
      matchesStops = flight.outbound.stops === 0 && (!flight.return || flight.return.stops === 0);
    } else if (filters.stops === '1-stop') {
      matchesStops = flight.outbound.stops <= 1 && (!flight.return || flight.return.stops <= 1);
    }

    let matchesAirline = true;
    if (filters.airlines?.length > 0) {
      matchesAirline = (
        filters.airlines.includes(flight.outbound.airline) &&
        (!flight.return || filters.airlines.includes(flight.return.airline))
      );
    }

    return withinPriceRange && matchesStops && matchesAirline;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Flights Clone</h1>
      </header>
      <main className="App-main">
        <SearchForm onSearch={handleSearch} />
        <Box 
          sx={{ 
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <Box
            sx={{ 
              display: 'flex',
              gap: 3,
              alignItems: 'flex-start'
            }}
          >
            <Filters 
              filters={filters} 
              onFilterChange={handleFilterChange}
              flights={flights}
            />
            <Box sx={{ flexGrow: 1 }}>
              <FlightResults flights={filteredFlights} />
            </Box>
          </Box>
        </Box>
      </main>
      <footer className="App-footer">
        {/* Add footer content */}
      </footer>
    </div>
  );
}

export default App;
