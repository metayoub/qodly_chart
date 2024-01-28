import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo } from 'react';
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
import { randomColor } from '../shared/colorUtils';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bar: FC<IBarProps> = ({
  name,
  legendPosition,
  grid = false,
  tooltip = true,
  xAxis = true,
  yAxis = true,
  stacked = false,
  datasets = [],
  orientation,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const empty: any[] = [];
  const [value, setValue] = useState({
    labels: empty,
    datasets: datasets.map((set) => {
      const color = randomColor();
      return {
        label: set.label,
        data: empty,
        borderColor: set.borderColor || set.backgroundColor,
        backgroundColor: set.backgroundColor || set.borderColor || color,
        borderSkipped:
          set.borderSkipped === 'false' ||
          (set.borderSkipped as 'start' | 'end' | 'middle' | 'bottom' | 'left' | 'top' | 'right'),
        borderRadius: set.borderRadius,
        borderWidth: set.borderWidth,
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
        labels: v.map((e) => e.x),
        datasets: datasets.map((_set, index) => ({
          ...prevValue.datasets[index],
          data: v.map((e) => e[_set.source]),
          // borderSkipped: false,
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
      indexAxis: orientation,
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
    [legendPosition, style, grid, xAxis, yAxis, tooltip, name, orientation, stacked],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <BarChart options={options} data={value} />
    </div>
  );
};

export default Bar;
