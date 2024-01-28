import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineRadar } from 'react-icons/md';

import RadarSettings, { BasicSettings } from './Radar.settings';

export default {
  craft: {
    displayName: 'Radar',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(RadarSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Radar',
    exposed: true,
    icon: MdOutlineRadar,
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
    label: 'Qodly chart summary',
    grid: true,
    tooltip: true,
    tick: true,
    legendPosition: 'top',
    style: {
      height: '300px',
      width: '300px',
    },
  },
} as T4DComponentConfig<IRadarProps>;

export interface IRadarProps extends webforms.ComponentProps {
  labels?: IDataSet[];
  title?: string;
  tick?: boolean;
  grid?: boolean;
  min?: number;
  max?: number;
  step?: number;
  tooltip?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'chartArea';
}

export interface IDataSet {
  label: string;
}
