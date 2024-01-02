import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import { IDoughnutPieProps } from './DoughnutPie.config';

const DoughnutPie: FC<IDoughnutPieProps> = ({
  labels = [],
  type,
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

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {type === 'pie' ? <Pie data={data} /> : <Doughnut data={data} />}
    </div>
  );
};

export default DoughnutPie;
