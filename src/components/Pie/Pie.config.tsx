import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlinePieChart } from 'react-icons/md';

import PieSettings, { BasicSettings } from './Pie.settings';

export default {
  craft: {
    displayName: 'Pie',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(PieSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Pie',
    exposed: true,
    icon: MdOutlinePieChart,
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
    raduis: 0,
    tooltip: true,
    legendPosition: 'top',
    style: {
      height: '300px',
      width: '300px',
    },
  },
} as T4DComponentConfig<IPieProps>;

export interface IPieProps extends webforms.ComponentProps {
  title?: string;
  raduis?: number;
  colors?: IColors[];
  legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';
  tooltip?: boolean;
}

export interface IColors {
  color?: string;
}
