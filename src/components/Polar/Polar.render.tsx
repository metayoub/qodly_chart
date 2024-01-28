import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useMemo } from 'react';
import { IPolarProps } from './Polar.config';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { generateColorPalette, randomColor, colorToHex } from '../shared/colorUtils';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Polar: FC<IPolarProps> = ({
  name,
  legendPosition,
  tooltip = true,
  tooltipLabel,
  grid = true,
  min,
  max,
  step,
  tick = true,
  colors = [],
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const empty: any[] = [];

  const [value, setValue] = useState({
    labels: empty,
    datasets: [
      {
        label: tooltipLabel, // make it dynamic
        data: empty,
        backgroundColor: empty,
        borderColor: empty,
      },
    ],
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

      setValue((prevValue) => ({
        ...prevValue,
        labels: v.map((e) => e.label),
        datasets: prevValue.datasets.map((_set, index) => ({
          ...prevValue.datasets[index],
          data: v.map((e) => e.value),
          backgroundColor: v.map(
            (e, index) =>
              (e.color && (e.borderColor ? e.color : colorToHex(e.color) + '50')) ||
              colorgenerated[index] + '50',
          ),
          borderColor: v.map((e, index) => e.borderColor || e.color || colorgenerated[index]),
        })),
      }));
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
          suggestedMin: min,
          suggestedMax: max,
          ticks: {
            display: tick,
            stepSize: step,
          },
        },
      },
    }),
    [legendPosition, style, name, grid, tooltip, min, max, tick, step],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <PolarArea data={value} options={options} />
    </div>
  );
};

export default Polar;
