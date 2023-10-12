import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage.jsx';
import RouteList from './components/RouteList.jsx';

function App() {
  const [showHomePage, setShowHomePage] = useState(true);

  const toggleComponent = () => {
    setShowHomePage((prevShowHomePage) => !prevShowHomePage);
  };

  return (
    <React.Fragment>
      {showHomePage ? <HomePage /> : <RouteList />}
      <button className="toggle-button" onClick={toggleComponent}>
        Toggle Component
      </button>
    </React.Fragment>
  );
}

export default App;