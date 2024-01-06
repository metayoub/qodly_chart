import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
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
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const data = useMemo(
    () => ({
      labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
      datasets: datasets.map((set) => ({
        fill: set.fill,
        label: set.label,
        data: [2, 8, 3, 5, 10, 6],
        borderColor: set.borderColor || set.backgroundColor,
        pointBackgroundColor: set.pointBackgroundColor || set.backgroundColor || set.borderColor,
        pointBorderColor: set.pointBackgroundColor || set.backgroundColor || set.borderColor, // to change
        pointStyle: set.pointStyle,
        backgroundColor: set.backgroundColor || set.borderColor,
        pointRadius: set.pointSize,
      })),
    }),
    [label, datasets],
  );

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
      <RadarChart data={data} options={options} />
    </div>
  );
};

export default Radar;
