

function App() {
  return (
    <div className="App">
      <header className="Title">
        <h1 className="Title-large">Interactive Linear Regression Tuner</h1>
        <p className="Title-small">Adjust the slope and intercept to find the best fit for the data.</p>
      </header>

      <div className="Grid">
        <div className="Grid-item">
          <h2 className="Title">Parameters</h2>
          <div className="Input-container">
              {/* Slope Slider */}
              <div>
                <label htmlFor="slope" className="Slope-input-label">Slope (m): <span className="font-bold text-indigo-600"></span></label>
                <input
                  type="range"
                  id="slope"
                  min="-5"
                  max="5"
                  step="0.01"
                  value="1"
                  onChange={() => {}}
                  className="Slope-input"
                />
              </div>

              {/* Intercept Slider */}
              <div>
                <label htmlFor="intercept" className="Intercept-input-label">Y-Intercept (b): <span className="font-bold text-indigo-600"></span></label>
                <input
                  type="range"
                  id="intercept"
                  min="-10"
                  max="10"
                  step="0.1"
                  value="1"
                  onChange={() => {}}
                  className="Intercept-input"
                />
              </div>
            </div>

            <div className="Performance-metrics-container">
               <h3 className="Title">Model Performance</h3>
               <div className="Performance-metrics">
                   <p className="Mse-title Title-small">Mean Squared Error (MSE)</p>
                   <p className="Mse Title-small">0.254</p>
               </div>
            </div>

            <div className="Reset-button-container">
                <button 
                    onClick={() => {}}
                    className="Reset-button"
                >
                    Reset Parameters
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
