import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineAreaChart } from 'react-icons/md';

import MixedSettings, { BasicSettings } from './Mixed.settings';

export default {
  craft: {
    displayName: 'Mixed Chart',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(MixedSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Mixed Chart',
    exposed: true,
    icon: MdOutlineAreaChart,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {
    title: 'Qodly chart summary',
    legendPosition: 'top',
    grid: false,
    tooltip: true,
    xAxis: true,
    yAxis: true,
    stacked: false,
  },
} as T4DComponentConfig<IMixedProps>;

export interface IMixedProps extends webforms.ComponentProps {
  title?: string;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';
  grid?: boolean;
  tooltip?: boolean;
  xAxis?: boolean;
  yAxis?: boolean;
  stacked?: boolean;
  dataSets?: IDataSet[];
}

export interface IDataSet {
  label?: string;
  type: 'line' | 'bar' | 'radar' | 'pie' | 'doughnut';
  source: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
}
