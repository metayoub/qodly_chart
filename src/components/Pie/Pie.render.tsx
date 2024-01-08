import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo } from 'react';
import { IPieProps } from './Pie.config';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieChart } from 'react-chartjs-2';
import { generateColorPalette, colorToHex, randomColor } from '../shared/colorUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie: FC<IPieProps> = ({
  colors = [],
  title,
  legendPosition,
  tooltip,
  cutout,
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
        backgroundColor: empty,
        borderColor: empty,
      },
    ],
    labels: empty,
  });
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<Array<any>>();
      const colorgenerated = generateColorPalette(
        v.length,
        ...colors.map((e) => e.color || randomColor()),
      );
      const data = {
        datasets: [
          {
            data: v.map((e) => e.value),
            backgroundColor: v.map(
              (e, index) =>
                (e.color && (e.borderColor ? e.color : colorToHex(e.color) + '50')) ||
                colorgenerated[index] + '50',
            ),
            borderColor: v.map((e, index) => e.borderColor || e.color || colorgenerated[index]),
          },
        ],
        labels: v.map((e) => e.label),
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

  const options = useMemo(
    () => ({
      responsive: true,
      cutout: cutout,
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
      <PieChart data={value} options={options} />
    </div>
  );
};

export default Pie;
