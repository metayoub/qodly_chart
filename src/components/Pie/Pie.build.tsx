import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieChart } from 'react-chartjs-2';
import { generateColorPalette, randomColor } from '../shared/colorUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

import { IPieProps } from './Pie.config';

const Pie: FC<IPieProps> = ({
  colors = [],
  legendPosition,
  title,
  cutout,
  tooltip,
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
      datasets: [
        {
          data: labels.map(() => 1),
          backgroundColor: colorgenerated.map((e) => e + '50'),
          borderColor: colorgenerated,
        },
      ],
      labels: labels,
    }),
    [labels, colorgenerated],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      cutout: cutout,
      // rotation: 270, // make it dynamic
      //radius: '50%', // we will see about it
      // circumference: 180, // make it dynamic
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
    }),
    [legendPosition, tooltip, style, title, cutout],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <PieChart data={data} options={options} />
    </div>
  );
};

export default Pie;
