import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { IDoughnutPieProps } from './DoughnutPie.config';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutPie: FC<IDoughnutPieProps> = ({
  labels = [],
  type,
  style,
  className,
  classNames = [],
}) => {
  const empty: any[] = [];
  const { connect } = useRenderer();
  const [value, setValue] = useState({
    datasets: [
      {
        data: empty,
        backgroundColor: labels.map((e) => e.backgroundColor),
        borderColor: labels.map((e) => e.borderColor),
      },
    ],
    labels: labels.map((e) => e.title),
  });
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<Array<any>>();
      const data = {
        datasets: [
          {
            data: v,
            backgroundColor: labels.map((e) => e.backgroundColor),
            borderColor: labels.map((e) => e.borderColor),
          },
        ],
        labels: labels.map((e) => e.title),
      };
      setValue(data);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {type === 'pie' ? <Pie data={value} /> : <Doughnut data={value} />}
    </div>
  );
};

export default DoughnutPie;
