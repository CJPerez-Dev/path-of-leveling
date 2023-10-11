import React, { useState, useEffect } from 'react';
import { version } from '../../../../package.json';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import RouteIcon from '@mui/icons-material/Route';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton'; 
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function HomePage() {
  const [actsData, setActsData] = useState([]);
  const [showActs, setShowActs] = useState(false);
  const [actOpenState, setActOpenState] = useState({});

  const fetchActsData = async () => {
    try {
      const acts = await window.api.getActs();
      setActsData(acts);
      setShowActs(true);
    } catch (error) {
      console.error('Error fetching Acts:', error);
    }
  };

  const moveFirstExerciseToFinished = async () => {
    const actIndex = 0; // Act 1
    const exercise = actsData[actIndex].unfinishedSteps[0]; // First exercise in unfinishedSteps
    try {
      const success = await window.api.moveExerciseToFinished(actIndex, exercise);
      if (success) {
        fetchActsData(); // Update the act data
      }
    } catch (error) {
      console.error('Error moving exercise to finishedSteps:', error);
    }
  };

  const moveFirstExerciseToUnfinished = async () => {
    const actIndex = 0; // Act 1
    const exercise = actsData[actIndex].finishedSteps[0]; // First exercise in finishedSteps
    try {
      const success = await window.api.moveExerciseToUnfinished(actIndex, exercise);
      if (success) {
        fetchActsData(); // Update the act data
      }
    } catch (error) {
      console.error('Error moving exercise to unfinishedSteps:', error);
    }
  };

  const toggleActOpenState = (actIndex) => {
    console.log("TOGGLED")
    setActOpenState((prevState) => ({
      ...prevState,
      [actIndex]: !prevState[actIndex],
    }));
  };

  useEffect(() => {
    fetchActsData(); // Fetch act data when the component mounts
  }, []);

  return (
    <div>
      <h1>Path of Leveling</h1>
      <p className="read-the-docs">Created by Chase Perez</p>
      <h5>Version: {version}</h5>
      <Grid container>
        <Grid item xs={4}>
          <SettingsIcon fontSize="large" />
        </Grid>
        <Grid item xs={4}>
          <HomeIcon fontSize="large" />
        </Grid>
        <Grid item xs={4}>
          <RouteIcon fontSize="large" />
        </Grid>
      </Grid>
      <button onClick={moveFirstExerciseToFinished}>Move First Exercise to Finished</button>
      <button onClick={moveFirstExerciseToUnfinished}>Move First Exercise to Unfinished</button>
      {showActs && (
        <div>
          <h2>Acts Data:</h2>
          <List>
            {actsData.map((act, actIndex) => (
              <div key={actIndex}>
                <ListItemButton // Use ListItemButton instead of ListItem
                  onClick={() => toggleActOpenState(actIndex)}
                >
                  <ListItemText primary={act.name} />
                  {actOpenState[actIndex] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <List component="div" disablePadding>
                  <ListItemButton // Use ListItemButton instead of ListItem
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="Unfinished Steps" />
                  </ListItemButton>
                  {act.unfinishedSteps.map((step, stepIndex) => (
                    <ListItemButton // Use ListItemButton instead of ListItem
                      key={stepIndex}
                      sx={{ pl: 8 }}
                    >
                      <ListItemText primary={step} />
                    </ListItemButton>
                  ))}
                  <ListItemButton // Use ListItemButton instead of ListItem
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="Finished Steps" />
                  </ListItemButton>
                  {act.finishedSteps.map((step, stepIndex) => (
                    <ListItemButton // Use ListItemButton instead of ListItem
                      key={stepIndex}
                      sx={{ pl: 8 }}
                    >
                      <ListItemText primary={step} />
                    </ListItemButton>
                  ))}
                </List>
              </div>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}

export default HomePage;
