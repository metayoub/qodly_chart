import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo } from 'react';

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
import { randomColor, colorToHex } from '../shared/colorUtils';
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
  const { connect } = useRenderer();
  const empty: any[] = [];
  const [value, setValue] = useState({
    datasets: dataSets.map((set, index) => {
      const color = randomColor();
      return {
        type: set.type,
        label: set.label,
        data: empty,
        fill: set.fill || false,
        borderColor: colorToHex(set.borderColor || color),
        backgroundColor: colorToHex(set.backgroundColor || set.backgroundColor || color) + '50',
        borderWidth: set.borderWidth || 1,
        order: index,
        tension: set.tension || 0,
        stepped: set.stepped || false,
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
        datasets: dataSets.map((_set, index) => ({
          ...prevValue.datasets[index],
          data: v[index]?.data,
          label: v[index]?.label || _set.label,
          // backgroundColor: v[index]?.backgroundColor && _set.backgroundColor,
          // borderColor: v[index]?.borderColor && _set.borderColor,
          fill: v[index]?.fill || _set.fill,
          borderWidth: v[index]?.borderWidth || _set.borderWidth,
          tension: v[index]?.tension || _set.tension,
          stepped: v[index]?.stepped || _set.stepped,
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
    <span ref={connect} style={style} className={cn(className, classNames)}>
      <Chart type="bar" data={value} options={options} />
    </span>
  );
};

export default Mixed;
