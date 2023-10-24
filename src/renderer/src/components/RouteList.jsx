import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

function RouteList() {
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

  const toggleActOpenState = (actIndex) => {
    setActOpenState((prevState) => ({
      ...prevState,
      [actIndex]: !prevState[actIndex],
    }));
  };

  const toggleStepFinishedState = async (actIndex, step) => {
    const updatedActsData = [...actsData];
    const act = updatedActsData[actIndex];

    if (act.unfinishedSteps.includes(step)) {
      act.unfinishedSteps = act.unfinishedSteps.filter((item) => item !== step);
      act.finishedSteps.push(step);
    } else if (act.finishedSteps.includes(step)) {
      act.finishedSteps = act.finishedSteps.filter((item) => item !== step);
      act.unfinishedSteps.push(step);
    }

    setActsData(updatedActsData);

    const success = await window.api.moveStepToFinished(actIndex, step);
    if (!success) {
      console.error('Error updating step:', step);
    }
  };

  useEffect(() => {
    fetchActsData();
  }, []);

  // Function to sort steps based on their numerical prefixes
  const sortSteps = (steps) => {
    return steps.sort((a, b) => {
      const aNumber = parseInt(a.match(/^\d+/));
      const bNumber = parseInt(b.match(/^\d+/));
      return aNumber - bNumber;
    });
  };

  return (
    <React.Fragment>
      {showActs && (
        <div>
          <h2>Acts Data:</h2>
          <List>
            {actsData.map((act, actIndex) => (
              <React.Fragment key={actIndex}>
                <ListItemButton onClick={() => toggleActOpenState(actIndex)}>
                  <ListItemText primary={act.name} />
                  {actOpenState[actIndex] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={actOpenState[actIndex]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {sortSteps(act.finishedSteps).map((step, stepIndex) => (
                      <ListItemButton
                        key={stepIndex}
                        sx={{ pl: 4 }}
                        onClick={() => toggleStepFinishedState(actIndex, step)}
                        style={{ color: 'lightgray', textDecoration: 'line-through' }}
                      >
                        <ListItemText primary={step} />
                      </ListItemButton>
                    ))}
                    {sortSteps(act.unfinishedSteps).map((step, stepIndex) => (
                      <ListItemButton
                        key={stepIndex}
                        sx={{ pl: 4 }}
                        onClick={() => toggleStepFinishedState(actIndex, step)}
                      >
                        <ListItemText primary={step} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </div>
      )}
    </React.Fragment>
  );
}

export default RouteList;