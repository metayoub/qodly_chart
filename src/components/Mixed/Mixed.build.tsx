import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { randomColor } from '../shared/colorUtils';
import { IMixedProps } from './Mixed.config';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

const Mixed: FC<IMixedProps> = ({
  title,
  legendPosition,
  grid,
  tooltip,
  xAxis,
  yAxis,
  stacked,
  style,
  dataSets = [],
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const data = useMemo(
    () => ({
      datasets: dataSets.map((set, index) => {
        const color = randomColor();
        return {
          type: set.type,
          label: set.label,
          data: [
            { x: 'January', y: Math.random() * 10 },
            { x: 'February', y: Math.random() * 10 },
            { x: 'March', y: Math.random() * 10 },
            { x: 'April', y: Math.random() * 10 },
            { x: 'May', y: Math.random() * 10 },
            { x: 'June', y: Math.random() * 10 },
          ],
          fill: set.fill || false,
          borderColor: set.borderColor || color,
          backgroundColor: set.backgroundColor || set.borderColor || color + '50',
          borderWidth: set.borderWidth || 1,
          order: index,
          tension: set.tension || 0,
          stepped: set.stepped || false,
        };
      }),
    }),
    [dataSets],
  );
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      // indexAxis: orientation,
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
          display: title !== '',
          text: title,
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
          stacked: stacked,
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
        },
      },
    }),
    [legendPosition, style, grid, xAxis, yAxis, tooltip, title, stacked],
  );

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default Mixed;
