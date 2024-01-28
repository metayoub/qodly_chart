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
        key: 'pointBackgroundColor',
        label: 'Point Color',
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
      {
        key: 'pointSize',
        label: 'Point Size',
        type: ESetting.NUMBER_FIELD,
        defaultValue: 5,
      },
      {
        key: 'tension',
        label: 'Tension',
        type: ESetting.NUMBER_FIELD,
        defaultValue: 0,
      },
      {
        key: 'fill',
        label: 'Fill',
        type: ESetting.CHECKBOX,
      },
      {
        key: 'stepped',
        label: 'Stepped',
        type: ESetting.CHECKBOX,
        defaultValue: false,
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
