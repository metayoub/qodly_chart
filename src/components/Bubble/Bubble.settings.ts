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
    key: 'name',
    label: 'Name',
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
    type: ESetting.DATAGRID,
    key: 'datasets',
    name: 'Data',
    label: 'Data',
    data: [
      {
        key: 'label',
        label: 'Label',
        type: ESetting.TEXT_FIELD,
      },
      {
        key: 'source',
        label: 'Source',
        type: ESetting.TEXT_FIELD,
      },
      {
        key: 'pointBackgroundColor',
        label: 'Color',
        type: ESetting.COLOR_PICKER,
      },
      {
        key: 'pointBorderColor',
        label: 'Border Color',
        type: ESetting.COLOR_PICKER,
      },
      {
        key: 'pointStyle',
        label: 'Point Styles',
        type: ESetting.SELECT,
        options: [
          { value: 'circle', label: 'Circle' },
          { value: 'cross', label: 'Cross' },
          { value: 'crossRot', label: 'CrossRot' },
          { value: 'dash', label: 'Dash' },
          { value: 'line', label: 'Line' },
          { value: 'rect', label: 'Rect' },
          { value: 'rectRounded', label: 'RectRounded' },
          { value: 'rectRot', label: 'RectRot' },
          { value: 'star', label: 'Star' },
          { value: 'triangle', label: 'Triangle' },
          { value: '', label: 'none' },
        ],
      },
    ],
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
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...load(DEFAULT_SETTINGS).filter(
    'style.overflow',
    'display',
    'style.boxShadow',
    'style.textShadow',
    'style.textAlign',
    'style.textDecorationLine',
    'style.fontStyle',
    'style.textTransform',
  ),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter(
    'style.overflow',
    'display',
    'style.boxShadow',
    'style.textShadow',
    'style.textAlign',
    'style.textDecorationLine',
    'style.fontStyle',
    'style.textTransform',
  ),
];

export default Settings;
