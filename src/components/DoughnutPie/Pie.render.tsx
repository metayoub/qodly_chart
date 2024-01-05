import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { IPieProps } from './Pie.config';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieChart } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie: FC<IPieProps> = ({
  colors = [],
  title,
  legendPosition,
  tooltip,
  raduis,
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
        backgroundColor: colors.map((e) => e.color),
        borderColor: colors.map((e) => e.color),
      },
    ],
    labels: ['1', '2', '3', '4', '5'], // labels.map((e) => e.title),
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
            backgroundColor: colors.map((e) => e.color),
            borderColor: colors.map((e) => e.color),
          },
        ],
        labels: ['1', '2', '3', '4', '5'], // labels.map((e) => e.title),
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
      <PieChart data={value} options={options} />
    </div>
  );
};

export default Pie;
