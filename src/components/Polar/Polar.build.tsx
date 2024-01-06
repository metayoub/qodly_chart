import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { IPolarProps } from './Polar.config';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { generateColorPalette, randomColor } from '../shared/colorUtils';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Polar: FC<IPolarProps> = ({
  name,
  legendPosition,
  tooltip = true,
  tooltipLabel,
  grid = true,
  min,
  max,
  step,
  tick,
  colors = [],
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const labels = ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'];

  const colorgenerated = useMemo(
    () => generateColorPalette(labels.length, ...colors.map((e) => e.color || randomColor())),
    [colors],
  );

  const data = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          label: tooltipLabel,
          data: [7, 10, 7, 5, 4],
          backgroundColor: colorgenerated.map((e) => e + '50'),
          borderColor: colorgenerated,
        },
      ],
    }),
    [labels, tooltipLabel],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: (legendPosition as string) !== 'hidden',
          position: legendPosition,
          labels: {
            font: {
              family: style?.fontFamily || 'inherit',
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
        r: {
          display: grid,
          suggestedMin: min,
          suggestedMax: max,
          ticks: {
            display: tick,
            stepSize: step,
          },
        },
      },
    }),
    [legendPosition, style, name, grid, tooltip, min, max, step, tick],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default Polar;
