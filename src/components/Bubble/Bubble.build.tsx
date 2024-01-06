import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { IBubbleProps } from './Bubble.config';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble as BubbleChart } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const Bubble: FC<IBubbleProps> = ({
  name,
  datasets = [],
  legendPosition = 'top',
  grid = false,
  tooltip = true,
  xAxis = true,
  yAxis = true,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: (legendPosition as string) !== 'hidden',
          position: legendPosition,
          labels: {
            color: style?.color,
            font: {
              size: (style?.fontSize as number) || 14,
              family: style?.fontFamily || 'inherit',
              weight: style?.fontWeight as number,
            },
          },
        },
        title: {
          display: name !== '',
          text: name,
          color: style?.color,
          font: {
            size: (style?.fontSize as number) || 14,
            family: style?.fontFamily || 'inherit',
            weight: style?.fontWeight as number,
          },
        },
        tooltip: {
          enabled: tooltip,
        },
      },
      scales: {
        x: {
          display: xAxis,
          grid: {
            display: grid,
          },
        },
        y: {
          grid: {
            display: grid,
          },
          display: yAxis,
          beginAtZero: true,
        },
      },
    }),
    [legendPosition, style, grid, xAxis, yAxis, tooltip, name],
  );

  const data = useMemo(
    () => ({
      datasets: datasets.map((set) => ({
        label: set.label,
        data: Array.from({ length: 20 }, () => ({
          x: Math.floor(Math.random() * 41) - 20,
          y: Math.floor(Math.random() * 41) - 20,
          r: Math.floor(Math.random() * 5) + 1,
        })),
        pointBackgroundColor: set.pointBackgroundColor || set.pointBorderColor,
        pointBorderColor: set.pointBorderColor || set.pointBackgroundColor,
        pointStyle: set.pointStyle,
      })),
    }),
    [datasets],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <BubbleChart options={options} data={data} />
    </div>
  );
};

export default Bubble;
