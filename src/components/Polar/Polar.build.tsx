import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { IPolarProps } from './Polar.config';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Polar: FC<IPolarProps> = ({
  name,
  legendPosition,
  tooltip = true,
  tooltipLabel,
  grid = true,
  labels = [],
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const data = useMemo(
    () => ({
      labels: labels.map((elm) => elm.label),
      datasets: [
        {
          label: tooltipLabel,
          data: labels.map(() => Math.random()),
          backgroundColor: labels.map((e) => e.backgroundColor),
          borderColor: labels.map((e) => e.borderColor),
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
        },
      },
    }),
    [legendPosition, style, name, grid, tooltip],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default Polar;
