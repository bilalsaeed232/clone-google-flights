import { useState } from 'react';

import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';

import './App.css';

function App() {
  const [flights, setFlights] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Mock flight data
    const mockFlights = [
      { airline: "Airline 1", price: 200, duration: "1h 30m", stops: 0 },
      { airline: "Airline 2", price: 100, duration: "1h 30m", stops: 0 },
      { airline: "Airline 3", price: 400, duration: "1h 30m", stops: 0 },
    ]

    console.log(mockFlights);
  
  
    setFlights(mockFlights);
  };
  


  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Flights Clone</h1>
      </header>
      <main className="App-main">
        <SearchForm onSearch={handleSearch} />
        <FlightResults flights={flights} />
      </main>
      <footer className="App-footer">
        {/* Add footer content */}
      </footer>
    </div>
  );
}

export default App;
