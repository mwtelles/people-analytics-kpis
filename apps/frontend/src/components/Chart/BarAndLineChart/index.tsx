import React, { useState } from 'react';
import * as S from './style';
import { useTheme } from 'styled-components';

interface DataSet {
    key: string;
    label: string;
    values: number[];
    type: 'bar' | 'line';
    color: string;
}

interface DataType {
    time: string[];
    datasets: DataSet[];
}

type ChartProps = {
    data: DataType,
    width: number;
    height: number;
  };

const BarAndLineChart: React.FC<ChartProps> = ({data, width, height}: ChartProps) => {
  const margin = { top: 35, right: 100, bottom: 0, left: 100 };
  const theme = useTheme();
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const [hoveredValue, setHoveredValue] = useState<{ x: number; y: number; value: number; label: string } | null>(null);

  const maxBarValue = Math.max(
    ...data.time.map((_, index) =>
      data.datasets
        .filter((d) => d.type === 'bar')
        .reduce((acc, dataset) => acc + dataset.values[index], 0)
    )
  );

  const maxLineValue = Math.max(...data.datasets.filter((d) => d.type === 'line').flatMap((d) => d.values));

  const getRoundedBarPath = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    const effectiveRadius = Math.min(radius, width / 2, height / 2);
  
    return `
      M${x},${y + height} 
      h${width} 
      v-${height - effectiveRadius} 
      a${effectiveRadius},${effectiveRadius} 0 0 0 -${effectiveRadius},-${effectiveRadius} 
      h-${width - effectiveRadius} 
      a${effectiveRadius},${effectiveRadius} 0 0 0 -${effectiveRadius},${effectiveRadius} 
      v${height - effectiveRadius} 
      z
    `;
  };
  
  const getLinePath = (dataset: DataSet) => {
    const totalPoints = data.time.length;
    const startPoint = `M${margin.left},${yLineScale(dataset.values[0])}`;
    const endPoint = `L${width - margin.right},${yLineScale(dataset.values[totalPoints - 1])}`;
    const linePoints = dataset?.values
      .map((value, index) => `L${xScale(index)},${yLineScale(value)}`)
      .join(' ');
  
    return `${startPoint} ${linePoints} ${endPoint}`;
  };

  const xScale = (index: number) => {
    const totalPoints = data.time.length;
    const spacing = chartWidth / (totalPoints + 1);
    return margin.left + spacing * (index + 1);
  };

  const yBarScale = (value: number) => chartHeight - (value / maxBarValue) * chartHeight + margin.top;
  const yLineScale = (value: number) => chartHeight - (value / maxLineValue) * chartHeight + margin.top;

  return (
    <S.StyledSVG viewBox={`0 0 ${width} ${height}`}>

        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            className="grid-line"
            x1={margin.left}
            x2={width - margin.right}
            y1={margin.top + (chartHeight / 5) * i}
            y2={margin.top + (chartHeight / 5) * i}
          />
        ))}

        {Array.from({ length: 5 }).map((_, i) => {
          const value = (maxBarValue / 5) * i;
          return (
            <text
              key={`left-${i}`}
              x={margin.left - 50}
              y={chartHeight - (chartHeight / 5) * i + margin.top}
              textAnchor="end"
              className="axis-label"
            >
              {value.toLocaleString()}
            </text>
          );
        })}

        {Array.from({ length: 5 }).map((_, i) => {
          const value = (maxLineValue / 5) * i;
          return (
            <text
              key={`right-${i}`}
              x={width - margin.right + 50}
              y={chartHeight - (chartHeight / 5) * i + margin.top}
              textAnchor="start"
              className="axis-label"
            >
              {Math.round(value)}
            </text>
          );
        })}

        {data.time.map((time, index) => (
          <text
            key={time}
            x={xScale(index)}
            y={height - margin.bottom / 2}
            textAnchor="middle"
            className="axis-label"
          >
            {time}
          </text>
        ))}

        {data.time.map((_, index) => {
          let accumulatedHeight = 0; 
        
          return data.datasets
            .filter((d) => d.type === 'bar')
            .map((dataset) => {
              const value = dataset.values[index];
              const barHeight = chartHeight - yBarScale(value);
              const overlapOffset = 12; 
              const visualBarHeight = barHeight + overlapOffset;
              const barY = yBarScale(value) - accumulatedHeight - overlapOffset;
            
              accumulatedHeight += barHeight;
            
              return (
                <path
                  key={`${dataset.key}-${index}`}
                  className="bar"
                  fill={dataset.color}
                  d={getRoundedBarPath(
                    xScale(index) - 30,
                    barY,
                    60,
                    visualBarHeight,
                    10
                  )}
                  onMouseEnter={() =>
                    setHoveredValue({ x: xScale(index), y: barY, value, label: dataset.label })
                  }
                  onMouseLeave={() => setHoveredValue(null)}
                />
              );
            });
        })}


        {data.datasets
          .filter((d) => d.type === 'line')
          .map((dataset) => (
            <path
              key={dataset.key}
              className="line"
              stroke={dataset.color}
              fill="none"
              d={getLinePath(dataset)}
            />
        ))}

        {data.datasets
          .filter((d) => d.type === 'line')
          .map((dataset) => dataset?.values.map((value, index) => (
              <g key={`${dataset.key}-point-${index}`}>
                <circle
                  cx={xScale(index)}
                  cy={yLineScale(value)}
                  r={8}
                  fill={dataset.color}
                  onMouseEnter={() => setHoveredValue({ x: xScale(index), y: yLineScale(value), value, label: dataset.label })}
                  onMouseLeave={() => setHoveredValue(null)}
                />

                <circle
                  cx={xScale(index)}
                  cy={yLineScale(value)}
                  r={4}
                  fill="white"
                  onMouseEnter={() => setHoveredValue({ x: xScale(index), y: yLineScale(value), value, label: dataset.label })}
                  onMouseLeave={() => setHoveredValue(null)}
                />
            </g>
        )))}


        {hoveredValue && (
          <g transform={`translate(${hoveredValue.x}, ${hoveredValue.y - 10})`}>
            <rect x={-35} y={-25} width={60} height={30} fill="white" rx="8" ry="8" stroke={theme.colors.text} />
            <text x={-5} y={-3} textAnchor="middle" className="tooltip">
              {hoveredValue.value}
            </text>
          </g>
        )}
      </S.StyledSVG>
  );
};

export default BarAndLineChart;
