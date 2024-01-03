import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { IDoughnutPieProps } from './DoughnutPie.config';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { pluginBackgroundColor } from '../shared/plugin';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutPie: FC<IDoughnutPieProps> = ({
  labels = [],
  type,
  name,
  legendPosition,
  tooltip,
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: (legendPosition as string) !== 'hidden',
        position: legendPosition,
      },
      title: {
        display: name !== '',
        text: name,
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
        <Pie data={value} options={options} plugins={[pluginBackgroundColor]} />
      ) : (
        <Doughnut data={value} options={options} plugins={[pluginBackgroundColor]} />
      )}
    </div>
  );
};

export default DoughnutPie;
