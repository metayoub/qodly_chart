import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { PiChartLine } from 'react-icons/pi';

import LineSettings, { BasicSettings } from './Line.settings';

export default {
  craft: {
    displayName: 'Line',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(LineSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Line',
    exposed: true,
    icon: PiChartLine,
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
    name: 'Qodly chart summary',
    tension: 0,
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
} as T4DComponentConfig<ILineProps>;

export interface ILineProps extends webforms.ComponentProps {
  name?: string;
  datasets?: IDataSet[];
  grid?: boolean;
  tooltip?: boolean;
  xAxis?: boolean;
  yAxis?: boolean;
  tension?: number;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';
}

export interface IDataSet {
  label: string;
  backgroundColor: string;
  borderColor: string;
  pointBackgroundColor: string;
  pointSize: number;
  fill: boolean;
  source: any;
  pointStyle?: string;
  data?: [];
}
