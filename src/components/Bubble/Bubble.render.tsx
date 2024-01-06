import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo } from 'react';
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
  const { connect } = useRenderer();
  const empty: any[] = [];

  const [value, setValue] = useState({
    datasets: datasets.map((set) => ({
      label: set.label,
      data: empty,
      pointBackgroundColor: set.pointBackgroundColor || set.pointBackgroundColor,
      pointBorderColor: set.pointBackgroundColor || set.pointBackgroundColor,
      pointStyle: set.pointStyle,
    })),
  });
  const {
    sources: { datasource: ds },
  } = useSources();

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

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <BubbleChart options={options} data={value} />
    </div>
  );
};

export default Bubble;
