import { useEffect } from 'react';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

function Axes({ groupRef, xScale, yScale, width, height, xLabel = 'X Value', yLabel = 'Y Value' }) {
  useEffect(() => {
    if (!groupRef?.current) {
      return;
    }

    const group = select(groupRef.current);
    group.selectAll('.axes-layer').remove();

    const axisLayer = group.append('g').attr('class', 'axes-layer');
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    axisLayer
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('y', 35)
      .attr('x', width / 2)
      .attr('fill', '#333')
      .attr('font-size', '12px')
      .text(xLabel);

    axisLayer
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -35)
      .attr('x', -height / 2)
      .attr('fill', '#333')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .text(yLabel);
  }, [groupRef, xScale, yScale, width, height, xLabel, yLabel]);

  return null;
}

export default Axes;
