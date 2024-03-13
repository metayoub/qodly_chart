import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineBubbleChart } from 'react-icons/md';

import BubbleSettings, { BasicSettings } from './Bubble.settings';

export default {
  craft: {
    displayName: 'Bubble',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(BubbleSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Bubble',
    exposed: true,
    icon: MdOutlineBubbleChart,
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
      accept: ['array'],
    },
  },
  defaultProps: {
    name: 'Qodly chart summary',
    grid: false,
    tooltip: true,
    xAxis: true,
    yAxis: true,
    legendPosition: 'top',
    style: {
      height: '200px',
      width: '400px',
    },
  },
} as T4DComponentConfig<IBubbleProps>;

export interface IBubbleProps extends webforms.ComponentProps {
  name?: string;
  datasets?: IDataSet[];
  grid?: boolean;
  tooltip?: boolean;
  xAxis?: boolean;
  yAxis?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';
}

export interface IDataSet {
  label: string;
  pointBorderColor: string;
  pointBackgroundColor: string;
  source: any;
  pointStyle?: string;
}
