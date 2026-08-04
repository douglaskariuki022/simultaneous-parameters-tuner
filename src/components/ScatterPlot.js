import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

function ScatterPlot({ data, slope, intercept }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const updateDimensions = () => {
      if (wrapperRef.current) {
        setDimensions({
          width: wrapperRef.current.clientWidth,
          height: 500,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = wrapper.clientWidth - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xMax = max(data, (d) => d.x);
    const yMax = max(data, (d) => d.y);
    const extent = [0, Math.max(xMax, yMax) * 1.1];

    const xScale = scaleLinear().domain(extent).range([0, width]);
    const yScale = scaleLinear().domain(extent).range([height, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('y', 35)
      .attr('x', width / 2)
      .attr('fill', '#333')
      .attr('font-size', '12px')
      .text('X Value');

    g.append('g')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -35)
      .attr('x', -height / 2)
      .attr('fill', '#333')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .text('Y Value');

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .attr('opacity', 0.7);

    const x1 = extent[0];
    const y1 = slope * x1 + intercept;
    const x2 = extent[1];
    const y2 = slope * x2 + intercept;

    g.append('line')
      .attr('x1', xScale(x1))
      .attr('y1', yScale(y1))
      .attr('x2', xScale(x2))
      .attr('y2', yScale(y2))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .style('stroke-dasharray', '3, 3');
  }, [data, slope, intercept, dimensions]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '500px' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ScatterPlot;
