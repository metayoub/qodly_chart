import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlinePieChart } from 'react-icons/md';

import DoughnutPieSettings, { BasicSettings } from './DoughnutPie.settings';

export default {
  craft: {
    displayName: 'Doughnut & Pie',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(DoughnutPieSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Doughnut & Pie',
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
    type: 'pie',
  },
} as T4DComponentConfig<IDoughnutPieProps>;

export interface IDoughnutPieProps extends webforms.ComponentProps {
  type?: string;
  labels?: ILabel[];
}

export interface ILabel {
  title: string;
  backgroundColor?: string;
  borderColor?: string;
}
