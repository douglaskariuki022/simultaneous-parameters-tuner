import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

function App() {

  // Initial data points for the linear regression
  const initialData = [
    { x: 1, y: 3.5 }, { x: 2, y: 4 }, { x: 3, y: 5.5 },
    { x: 4, y: 6 }, { x: 5, y: 8 }, { x: 6, y: 7.5 },
    { x: 7, y: 9 }, { x: 8, y: 10.5 }, { x: 9, y: 11 },
    { x: 10, y: 12 }
  ];

  const [data, setData] = useState(initialData);
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(2);
  const [mse, setMse] = useState(0);

  useEffect(() => {
    let error = 0;
    data.forEach(p => {
      const predictedY = slope * p.x + intercept;
      error += Math.pow(p.y - predictedY, 2);
    });
    setMse(error / data.length);
  }, [data, slope, intercept]);

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
                <label htmlFor="slope" className="Slope-input-label">Slope (m): <span className="font-bold text-indigo-600">{slope.toFixed(2)}</span></label>
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

              {/* Intercept Slider */}
              <div>
                <label htmlFor="intercept" className="Intercept-input-label">Y-Intercept (b): <span className="font-bold text-indigo-600">{intercept.toFixed(2)}</span></label>
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
                <button 
                    onClick={() => {setSlope(1); setIntercept(2);}}
                    className="Reset-button"
                >
                    Reset Parameters
                </button>
            </div>
        </div>

        <div className="Grid-item">
          <ScatterPlot data={data} slope={slope} intercept={intercept} />
        </div>
      </div>
    </div>
  );
}

function ScatterPlot({data, slope, intercept}) {
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const wrapper = wrapperRef.current;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = wrapper.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    svg.attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const xMax = d3.max(data, d => d.x);
    const yMax = d3.max(data, d => d.y);
    const extent = [0, Math.max(xMax, yMax) * 1.1];

    const xScale = d3.scaleLinear().domain(extent).range([0, width]);
    const yScale = d3.scaleLinear().domain(extent).range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    g.append("g").attr("transform", `translate(0,${height})`).call(xAxis)
     .append("text")
     .attr("y", 35)
     .attr("x", width / 2)
     .attr("fill", "#333")
     .attr("font-size", "12px")
     .text("X Value");

    g.append("g").call(yAxis)
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", -35)
     .attr("x", -height / 2)
     .attr("fill", "#333")
     .attr("font-size", "12px")
     .attr("text-anchor", "middle")
     .text("Y Value");

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .attr("opacity", 0.7);

    const x1 = extent[0];
    const y1 = slope * x1 + intercept;
    const x2 = extent[1];
    const y2 = slope * x2 + intercept;

    g.append("line")
      .attr("x1", xScale(x1))
      .attr("y1", yScale(y1))
      .attr("x2", xScale(x2))
      .attr("y2", yScale(y2))
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .style("stroke-dasharray", ("3, 3"));
  }, [data, slope, intercept])
  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '500px' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
