import './App.css';

import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Flights Clone</h1>
      </header>
      <main className="App-main">
        <SearchForm />
        <FlightResults />
      </main>
      <footer className="App-footer">
        {/* Add footer content */}
      </footer>
    </div>
  );
}

export default App;
