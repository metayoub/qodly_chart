import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { IRadarProps } from './Radar.config';
import { randomColor } from '../shared/colorUtils';
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
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const random = randomColor();

  const data = useMemo(
    () => ({
      labels: labels.map((e) => e.label),
      datasets: [
        {
          fill: true,
          label: 'Dataset 1',
          data: labels.map((_e, index) => index + 1 * 2),
          borderColor: random,
          pointBackgroundColor: random,
          pointBorderColor: random,
          backgroundColor: random + '50',
          pointStyle: 'rectRounded',
        },
      ],
    }),
    [labels],
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
      <RadarChart data={data} options={options} />
    </div>
  );
};

export default Radar;
