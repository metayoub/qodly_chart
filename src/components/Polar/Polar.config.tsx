import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { PiChartPolar } from 'react-icons/pi';

import PolarSettings, { BasicSettings } from './Polar.settings';

export default {
  craft: {
    displayName: 'Polar',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(PolarSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Polar',
    exposed: true,
    icon: PiChartPolar,
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
    legendPosition: 'top',
    tooltip: true,
    grid: true,
  },
} as T4DComponentConfig<IPolarProps>;

export interface IPolarProps extends webforms.ComponentProps {
  name?: string;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';
  tooltip?: boolean;
  grid?: boolean;
  datasets?: IDataSet[];
}

export interface IDataSet {
  label: string;
  backgroundColor: string;
  borderColor: string;
  fill: boolean;
  source: any;
}
