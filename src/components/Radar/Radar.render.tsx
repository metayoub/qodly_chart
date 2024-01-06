import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo } from 'react';
import { IRadarProps } from './Radar.config';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar as RadarChart } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Radar: FC<IRadarProps> = ({
  label,
  datasets = [],
  legendPosition,
  grid,
  tooltip,
  tick,
  min,
  max,
  step,
  style,
  className,
  classNames = [],
}) => {
  const empty: any[] = [];
  const { connect } = useRenderer();
  const [value, setValue] = useState({
    labels: empty,
    datasets: datasets.map((set) => ({
      fill: set.fill,
      label: set.label,
      data: empty,
      borderColor: set.borderColor || set.backgroundColor,
      pointBackgroundColor: set.pointBackgroundColor || set.backgroundColor || set.borderColor,
      pointBorderColor: set.pointBackgroundColor || set.backgroundColor || set.borderColor, // to change
      pointStyle: set.pointStyle,
      backgroundColor: set.backgroundColor || set.borderColor,
      pointRadius: set.pointSize,
    })),
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
        labels: v.map((e) => e.label),
        datasets: datasets.map((_set, index) => ({
          ...prevValue.datasets[index],
          data: v.map((e) => e[_set.source]),
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
          display: label !== '',
          text: label,
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
        r: {
          ticks: {
            display: tick,
            stepSize: step,
          },
          grid: {
            display: grid,
          },
          suggestedMin: min,
          suggestedMax: max,
        },
      },
    }),
    [legendPosition, style, grid, tooltip, tick, label, min, max, step],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <RadarChart data={value} options={options} />
    </div>
  );
};

export default Radar;
