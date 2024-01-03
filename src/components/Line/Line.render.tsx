import { useRenderer } from '@ws-ui/webform-editor';
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
  tension,
  style,
  tooltip,
  grid,
  xAxis,
  yAxis,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();

  /*useEffect(() => {
    if (!datasets) return;
    console.log('datasets: ', datasets);

    const listener = async (value: any) => {
      // const v = await ds.getValue<string>(value);
      // console.log('v: ', v);
      console.log('value: ', value);
      return v;
    };

    datasets.map((obj) => ({ ...obj, data: listener(obj.source) }));
  }, [datasets]);*/

  const data = useMemo(
    () => ({
      datasets: datasets.map((set) => ({
        fill: set.fill,
        label: set.label,
        data: set?.data,
        tension: tension,
        borderColor: set.borderColor,
        pointBackgroundColor: set.pointBackgroundColor,
        pointBorderColor: set.pointBackgroundColor, // to change
        pointStyle: set.pointStyle,
        backgroundColor: set.backgroundColor,
        pointRadius: set.pointSize,
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
  };

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <LineChart options={options} data={data} />
    </div>
  );
};

export default Line;
