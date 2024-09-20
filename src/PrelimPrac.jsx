import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const MatrixGame = () => {
  const [grid, setGrid] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [scores, setScores] = useState(Array(9).fill(0));
  const [lastRolled, setLastRolled] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [tempScores, setTempScores] = useState(Array(9).fill(0)); // Temporary scores to track during rolling

  const handleRoll = () => {
    if (!rolling) {
      // Start rolling
      const id = setInterval(() => {
        const randomNum = Math.floor(Math.random() * 9) + 1;
        const newTempScores = [...tempScores];
        newTempScores[randomNum - 1] += 1;
        setTempScores(newTempScores);

        const newGrid = [...grid];
        if (lastRolled !== null) {
          newGrid[lastRolled] = lastRolled + 1;
        }
        newGrid[randomNum - 1] = 0;
        setGrid(newGrid);
        setLastRolled(randomNum - 1);
      }, 100);
      setIntervalId(id);
      setRolling(true);
    } else {
      // Stop rolling
      clearInterval(intervalId);
      setIntervalId(null);
      setRolling(false);
      // Update the actual scores
      setScores(tempScores);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Matrix Game</h1>
      <p>Press "START ROLL" to randomize the grid numbers and "STOP ROLL" to stop.</p>

      <div style={{ marginBottom: '10px' }}>
        {grid.map((num, index) => (
          <span key={index} style={{ margin: '5px', fontSize: '20px' }}>
            {index + 1}
          </span>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        {scores.map((score, index) => (
          <span key={index} style={{ margin: '5px', fontSize: '20px' }}>
            {score}
          </span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px', justifyContent: 'center' }}>
        {grid.map((num, index) => (
          <div
            key={index}
            style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: num === 0 ? '#ffeb3b' : '#e0e0e0',
              fontSize: '30px',
              border: '1px solid #ccc',
              transition: 'background-color 0.3s ease',
              boxShadow: num === 0 ? '0 0 10px #ffeb3b' : 'none',
            }}
          >
            {num}
          </div>
        ))}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleRoll}
        style={{ marginTop: '20px' }}
      >
        {rolling ? 'STOP ROLL' : 'START ROLL'}
      </Button>
    </div>
  );
};

export default MatrixGame;
