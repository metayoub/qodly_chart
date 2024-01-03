import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { pluginBackgroundColor } from '../shared/plugin';

ChartJS.register(ArcElement, Tooltip, Legend);

import { IDoughnutPieProps } from './DoughnutPie.config';

const DoughnutPie: FC<IDoughnutPieProps> = ({
  labels = [],
  type,
  legendPosition,
  name,
  tooltip,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const data = {
    datasets: [
      {
        data: labels.map(() => 1),
        backgroundColor: labels.map((e) => e.backgroundColor),
        borderColor: labels.map((e) => e.borderColor),
      },
    ],
    labels: labels.map((e) => e.title),
  };

  const options = {
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
      customCanvasBackgroundColor: {
        color: style?.backgroundColor,
      },
    },
  };
  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      {type === 'pie' ? (
        <Pie data={data} options={options} plugins={[pluginBackgroundColor]} />
      ) : (
        <Doughnut data={data} options={options} plugins={[pluginBackgroundColor]} />
      )}
    </div>
  );
};

export default DoughnutPie;
