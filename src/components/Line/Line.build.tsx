import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { ILineProps } from './Line.config';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line as LineChart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const Line: FC<ILineProps> = ({
  name,
  datasets = [],
  legendPosition = 'top',
  grid = false,
  tension = 0,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const data = useMemo(
    () => ({
      datasets: datasets.map((set) => ({
        fill: set.fill,
        label: set.label,
        data: [
          { x: 'value 1', y: Math.random() * 10 },
          { x: 'value 2', y: Math.random() * 10 },
          { x: 'value 3', y: Math.random() * 10 },
          { x: 'value 4', y: Math.random() * 10 },
        ],
        tension: tension,
        borderColor: set.borderColor,
        backgroundColor: set.backgroundColor,
      })),
    }),
    [datasets, tension],
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: (legendPosition as string) !== 'hidden',
        position: legendPosition,
      },
      title: {
        display: name !== '',
        text: name,
      },
    },
    scales: {
      x: {
        grid: {
          display: grid,
        },
      },
      y: {
        grid: {
          display: grid,
        },
      },
    },
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <LineChart options={options} data={data} />
    </div>
  );
};

export default Line;
