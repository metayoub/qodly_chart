import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaRegChartBar } from 'react-icons/fa';

import BarSettings, { BasicSettings } from './Bar.settings';

export default {
  craft: {
    displayName: 'Bar',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(BarSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Bar',
    exposed: true,
    icon: FaRegChartBar,
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
    grid: true,
    tooltip: true,
    xAxis: true,
    yAxis: true,
    stacked: false,
    legendPosition: 'top',
    orientation: 'x',
    style: {
      height: '200px',
      width: '400px',
    },
  },
} as T4DComponentConfig<IBarProps>;

export interface IBarProps extends webforms.ComponentProps {
  name?: string;
  grid?: boolean;
  tooltip?: boolean;
  xAxis?: boolean;
  yAxis?: boolean;
  stacked?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';
  orientation: 'x' | 'y';
  datasets?: IDataSet[];
}

export interface IDataSet {
  label: string;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  borderWidth: number;
  borderSkipped:
    | 'start'
    | 'end'
    | 'middle'
    | 'bottom'
    | 'left'
    | 'top'
    | 'right'
    | 'true'
    | 'false';
  source: any;
}
