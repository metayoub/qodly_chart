import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieChart } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import { IPieProps } from './Pie.config';

const Pie: FC<IPieProps> = ({
  colors = [],
  legendPosition,
  title,
  raduis,
  tooltip,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const labels = ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'];

  const data = {
    datasets: [
      {
        data: labels.map(() => 1),
        backgroundColor: colors.map((e) => e.color),
        borderColor: colors.map((e) => e.color),
      },
    ],
    labels: labels,
  };

  const options = {
    responsive: true,
    cutout: raduis,
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
  };
  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <PieChart data={data} options={options} />
    </div>
  );
};

export default Pie;
