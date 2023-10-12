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

  const toggleStepFinishedState = (actIndex, stepIndex) => {
    const updatedActsData = [...actsData];
    const step = updatedActsData[actIndex].unfinishedSteps[stepIndex];

    if (updatedActsData[actIndex].finishedSteps.includes(step)) {
      updatedActsData[actIndex].finishedSteps = updatedActsData[actIndex].finishedSteps.filter((item) => item !== step);
    } else {
      updatedActsData[actIndex].finishedSteps.push(step);
    }

    setActsData(updatedActsData);
  };

  useEffect(() => {
    fetchActsData();
  }, []);

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
                    {act.unfinishedSteps.map((step, stepIndex) => (
                      <ListItemButton
                        key={stepIndex}
                        sx={{ pl: 4 }}
                        onClick={() => toggleStepFinishedState(actIndex, stepIndex)}
                        style={
                          act.finishedSteps.includes(step)
                            ? { color: 'lightgray', textDecoration: 'line-through' }
                            : {}
                        }
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
