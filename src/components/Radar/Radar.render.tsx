import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo } from 'react';
import { IRadarProps } from './Radar.config';
import { generateColorPalette, randomColor } from '../shared/colorUtils';
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
  title,
  labels = [],
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
    labels: labels.map((e) => e.label),
    datasets: empty,
  });
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<Array<any>>();
      const colorgenerated = generateColorPalette(
        v.length,
        ...v.map((e) => e.backgroundColor || e.borderColor || randomColor()),
      );
      setValue((prevValue) => ({
        ...prevValue,
        datasets: v.map((set, index) => ({
          label: set.label,
          data: set.data,
          backgroundColor: set.backgroundColor || colorgenerated[index] + '50', // genertae random color
          borderColor: set.borderColor || set.backgroundColor || colorgenerated[index],
          pointBackgroundColor: set.borderColor || set.backgroundColor || colorgenerated[index],
          pointBorderColor:
            set.pointBorderColor || set.borderColor || set.backgroundColor || colorgenerated[index],
          pointStyle: set.pointStyle || 'circle',
          fill: set.fill || false,
          pointRadius: set.pointSize || 5,
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
    [legendPosition, style, grid, tooltip, tick, title, min, max, step],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <RadarChart data={value} options={options} />
    </div>
  );
};

export default Radar;
