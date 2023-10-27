import React, { useState, useEffect } from 'react';
import './App.css';
import LoadingPage from './components/LoadingPage.jsx';
import RouteList from './components/RouteList.jsx';
import NavBar from './components/NavBar.jsx';

function App() {
  const [showHomePage, setShowHomePage] = useState(true);

  // Use useEffect to set a timer to switch to RouteList after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHomePage(false); // Switch to RouteList after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the timer when the component unmounts or when showHomePage is toggled
    return () => clearTimeout(timer);
  }, []);

  const toggleComponent = () => {
    setShowHomePage((prevShowHomePage) => !prevShowHomePage);
  };

  return (
    <React.Fragment>
      <NavBar />
      {showHomePage ? <LoadingPage /> : <RouteList />}
      <button className="toggle-button" onClick={toggleComponent}>
        Toggle Component
      </button>
    </React.Fragment>
  );
}

export default App;
