import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { IBarProps } from './Bar.config';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar as BarChart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bar: FC<IBarProps> = ({
  name,
  legendPosition,
  style,
  grid = false,
  tooltip = true,
  xAxis = true,
  yAxis = true,
  datasets = [],
  orientation,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const data = useMemo(
    () => ({
      labels: labels,
      datasets: datasets.map((set) => ({
        label: set.label,
        data: labels.map(() => Math.random() * 10),
        borderColor: set.borderColor || set.backgroundColor,
        backgroundColor: set.backgroundColor || set.borderColor,
      })),
    }),
    [datasets],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      indexAxis: orientation,
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
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
        },
      },
    }),
    [legendPosition, style, grid, xAxis, yAxis, tooltip, name, orientation],
  );
  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <BarChart options={options} data={data} />
    </div>
  );
};

export default Bar;
