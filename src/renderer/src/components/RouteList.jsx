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

  const toggleStepFinishState = async (actIndex, stepIndex) => {
    const updatedActsData = [...actsData];
    const act = updatedActsData[actIndex];
    const step = act.steps[stepIndex];

    step.finished = !step.finished;

    setActsData(updatedActsData);

    const success = await window.api.toggleStepFinishState(actIndex, stepIndex, step.finished);
    if (!success) {
      console.error('Error updating step:', step);
    }
  };

  useEffect(() => {
    fetchActsData();
  }, []);

  // Function to sort steps based on their numerical prefixes
  const sortSteps = (act) => {
    const steps = act.steps;

    if (Array.isArray(steps)) {
      return steps.slice().sort((a, b) => {
        const aNumber = parseInt(a.name.match(/^\d+/));
        const bNumber = parseInt(b.name.match(/^\d+/));
        return aNumber - bNumber;
      });
    } else {
      return [];
    }
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
                  <ListItemText primary={`Act ${act.actNumber}`} />
                  {actOpenState[actIndex] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={actOpenState[actIndex]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {sortSteps(act).map((step, stepIndex) => (
                      <ListItemButton
                        key={stepIndex}
                        sx={{ pl: 4 }}
                        onClick={() => toggleStepFinishState(actIndex, stepIndex)}
                        style={{ color: 'lightgray', textDecoration: step.finished ? 'line-through' : 'none' }}
                      >
                        <ListItemText primary={step.name} />
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
