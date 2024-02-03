import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo, useState, useEffect } from 'react';
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
import { randomColor } from '../shared/colorUtils';
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
  style,
  tooltip,
  grid,
  xAxis,
  yAxis,
  className,
  classNames = [],
}) => {
  const empty: any[] = [];
  const { connect } = useRenderer();
  const [value, setValue] = useState({
    datasets: datasets.map((set) => {
      const color = randomColor();
      return {
        fill: set.fill,
        label: set.label,
        data: empty,
        parsing: {
          yAxisKey: set.source,
        },
        tension: set.tension,
        borderColor: set.borderColor || set.backgroundColor || color,
        backgroundColor: set.backgroundColor || set.borderColor || color,
        pointBackgroundColor: set.pointBackgroundColor || set.backgroundColor || color,
        pointBorderColor: set.pointBackgroundColor || set.backgroundColor || color,
        pointStyle: set.pointStyle,
        pointRadius: set.pointSize,
        stepped: set.stepped,
      };
    }),
  });
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<Array<any>>();

      setValue((prevValue) => ({
        ...prevValue,
        datasets: datasets.map((_set, index) => ({
          ...prevValue.datasets[index],
          data: v,
        })),
      }));
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
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
    [legendPosition, style, grid, xAxis, yAxis, tooltip, name],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <LineChart options={options} data={value} />
    </div>
  );
};

export default Line;
