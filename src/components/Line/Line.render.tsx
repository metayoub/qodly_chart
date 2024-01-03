import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo } from 'react';
import { ILineProps } from './Line.config';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line as LineChart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const Line: FC<ILineProps> = ({
  name,
  datasets = [],
  legendPosition = 'top',
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState(() => name);
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      setValue(v || name);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  const data = useMemo(
    () => ({
      labels,
      datasets: datasets.map((set) => ({
        fill: set.fill,
        label: set.label,
        data: labels.map(() => Math.random() * 100),
        borderColor: set.borderColor,
        backgroundColor: set.backgroundColor,
      })),
    }),
    [labels, datasets],
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition,
      },
      title: {
        display: name !== '',
        text: name,
      },
    },
  };

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <LineChart options={options} data={data} />
    </div>
  );
};

export default Line;
