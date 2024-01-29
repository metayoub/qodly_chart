import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';
import {
  CgAlignBottom,
  CgAlignLeft,
  CgAlignRight,
  CgAlignTop,
  CgAlignCenter,
  CgAlignMiddle,
  CgShortcut,
} from 'react-icons/cg';

const commonSettings: TSetting[] = [
  {
    key: 'title',
    label: 'Title',
    type: ESetting.TEXT_FIELD,
    defaultValue: 'Qodly chart summary',
  },
  {
    key: 'legendPosition',
    label: 'Legend Position',
    type: ESetting.RADIOGROUP,
    defaultValue: 'top',
    options: [
      { value: 'top', icon: CgAlignTop },
      { value: 'bottom', icon: CgAlignBottom },
      { value: 'left', icon: CgAlignLeft },
      { value: 'right', icon: CgAlignRight },
      { value: 'center', icon: CgAlignCenter },
      { value: 'chartArea', icon: CgAlignMiddle },
      { value: 'hidden', icon: CgShortcut },
    ],
  },
  {
    type: ESetting.DATAGRID,
    key: 'dataSets',
    name: 'Charts',
    label: 'Charts',
    data: [
      {
        key: 'label',
        label: 'Label',
        type: ESetting.TEXT_FIELD,
      },
      {
        key: 'type',
        label: 'Type',
        type: ESetting.SELECT,
        defaultValue: 'line',
        options: [
          { value: 'line', label: 'Line' },
          { value: 'bar', label: 'Bar' },
          { value: 'scatter', label: 'Scatter' },
          { value: 'bubble', label: 'Bubble' },
          { value: 'radar', label: 'Radar' },
          // { value: 'pie', label: 'Pie' },
          { value: 'polarArea', label: 'Polar Area' },
          // { value: 'doughnut', label: 'Doughnut' },
        ],
      },
      {
        key: 'backgroundColor',
        label: 'Background Color',
        type: ESetting.COLOR_PICKER,
      },
      {
        key: 'borderColor',
        label: 'Border Color',
        type: ESetting.COLOR_PICKER,
      },
      {
        key: 'borderWidth',
        label: 'Border Width',
        type: ESetting.NUMBER_FIELD,
        defaultValue: 2,
      },
      {
        key: 'tension',
        label: 'Tension',
        type: ESetting.NUMBER_FIELD,
        defaultValue: 0.5,
      },
      {
        key: 'fill',
        label: 'Fill',
        type: ESetting.CHECKBOX,
      },
    ],
  },
  {
    key: 'grid',
    label: 'Display grid',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'tooltip',
    label: 'Display tooltip',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'xAxis',
    label: 'Display x-Axis Value',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'yAxis',
    label: 'Display y-Axis Value',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'stacked',
    label: 'Stacked Bar',
    type: ESetting.CHECKBOX,
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...DEFAULT_SETTINGS,
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
