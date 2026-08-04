import React, { useEffect, useState } from 'react';
import './App.css';
import ScatterPlot from './components/ScatterPlot';
import { calculateMse, createInitialData, formatEquation } from './utils/regression';

function App() {
  const [data] = useState(createInitialData());
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(2);
  const [mse, setMse] = useState(0);

  useEffect(() => {
    setMse(calculateMse(data, slope, intercept));
  }, [data, slope, intercept]);

  return (
    <div className="App">
      <header className="Title">
        <h1 className="Title-large">Interactive Linear Regression Tuner</h1>
        <p className="Title-small">Adjust the slope and intercept to find the best fit for the data.</p>
      </header>

      <div className="Grid">
        <div className="Grid-item-1">
          <h2 className="Title">Parameters</h2>
          <div>
            <p className="Title-small">Linear Equation</p>
            <p className="Title-small">{formatEquation(slope, intercept)}</p>
          </div>

          <div className="Input-container">
            <div>
              <label htmlFor="slope" className="Slope-input-label">
                Slope (m): <span className="font-bold text-indigo-600">{slope.toFixed(2)}</span>
              </label>
              <input
                type="range"
                id="slope"
                min="-5"
                max="5"
                step="0.01"
                value={slope}
                onChange={(e) => setSlope(parseFloat(e.target.value))}
                className="Slope-input"
              />
            </div>

            <div>
              <label htmlFor="intercept" className="Intercept-input-label">
                Y-Intercept (b): <span className="font-bold text-indigo-600">{intercept.toFixed(2)}</span>
              </label>
              <input
                type="range"
                id="intercept"
                min="-10"
                max="10"
                step="0.1"
                value={intercept}
                onChange={(e) => setIntercept(parseFloat(e.target.value))}
                className="Intercept-input"
              />
            </div>
          </div>

          <div className="Performance-metrics-container">
            <h3 className="Title">Model Performance</h3>
            <div className="Performance-metrics">
              <p className="Mse-title Title-small">Mean Squared Error (MSE)</p>
              <p className="Mse Title-small">{mse.toFixed(4)}</p>
            </div>
          </div>

          <div className="Reset-button-container">
            <button onClick={() => { setSlope(1); setIntercept(2); }} className="Reset-button">
              Reset Parameters
            </button>
          </div>
        </div>

        <div className="Grid-item-2">
          <ScatterPlot data={data} slope={slope} intercept={intercept} />
        </div>
      </div>
    </div>
  );
}

export default App;
