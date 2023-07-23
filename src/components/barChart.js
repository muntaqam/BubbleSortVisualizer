import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../App.css';

function BarChart({ data }) {
  const ref = useRef();

  const svgWidth = 700;  // 500 * 1.4
  const svgHeight = 700;  // 500 * 1.4
  const barWidth = 35;
  const barSpacing = 42;  // 30 * 1.4
  const padding = 30;

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const xScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, data.length * barSpacing]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, svgHeight - padding]);

    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d, i) => i * barSpacing)
      .attr("y", (d) => svgHeight - padding - yScale(d))
      .attr("width", barWidth)
      .attr("height", (d) => yScale(d))
      .attr("fill", "steelblue");

    svg.selectAll("text")
      .data(data)
      .join("text")
      .attr("x", (d, i) => i * barSpacing + barWidth / 2)
      .attr("y", (d) => svgHeight - padding - yScale(d) + 15)
      .attr("text-anchor", "middle")
      .text((d) => d)
      .style("fill", "white")
      .style("font-size", "12px");
  }, [data]);

  return <svg ref={ref}></svg>;
}

export default BarChart;
