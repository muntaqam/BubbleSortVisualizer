import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function QuickSortChart({ data }) {
  const ref = useRef();
  const padding = 30;

  const svgWidth = 700;  // 500 * 1.4
  const svgHeight = 700;  // 500 * 1.4
  const barWidth = 35;
  const barSpacing = 42;  // 30 * 1.4
  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, data.length * barSpacing]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgHeight - padding]);

  const updateBars = (newData, pivotIndex, leftIndex, rightIndex) => {
    const bars = d3.select(ref.current).selectAll("rect")
      .data(newData, (d) => d);
    
    bars.exit().remove();

    bars.attr("fill", (d, i) => {
        if (i === pivotIndex) return "green";
        if (i === leftIndex || i === rightIndex) return "orange";
        return "steelblue";
      })
      .attr("x", (d, i) => i * barSpacing)
      .attr("y", (d) => svgHeight - padding - yScale(d))
      .attr("height", (d) => yScale(d))
      .attr("width", barWidth);

    bars.enter()
      .append("rect")
      .attr("x", (d, i) => i * barSpacing)
      .attr("y", (d) => svgHeight - padding - yScale(d))
      .attr("width", barWidth)
      .attr("height", (d) => yScale(d))
      .attr("fill", "steelblue");

    const text = d3.select(ref.current).selectAll(".bar-label")
      .data(newData, (d) => d);

    text.attr("x", (d, i) => i * barSpacing + barWidth / 2)
      .attr("y", (d) => svgHeight - padding - yScale(d) + 15)
      .attr("text-anchor", "middle")
      .text((d) => d);

    text.enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d, i) => i * barSpacing + barWidth / 2)
      .attr("y", (d) => svgHeight - padding - yScale(d) + 15)
      .attr("text-anchor", "middle")
      .text((d) => d)
      .style("fill", "white")
      .style("font-size", "12px");

    text.exit().remove();
  };

  const partition = async (arr, low, high) => {
    let i = low - 1;
    let pivot = arr[high];

    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        await new Promise(r => setTimeout(r, 100));
        updateBars([...arr], high, i, j);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await new Promise(r => setTimeout(r, 100));
    updateBars([...arr], high, i+1, high);

    return (i + 1);
  }

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);

      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  useEffect(() => {
    quickSort(data, 0, data.length-1);
  }, [data]);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default QuickSortChart;
