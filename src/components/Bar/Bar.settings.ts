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
import { BiMoveHorizontal, BiMoveVertical } from 'react-icons/bi';

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
    key: 'orientation',
    label: 'Orientation',
    type: ESetting.RADIOGROUP,
    defaultValue: 'y',
    options: [
      {
        value: 'x',
        tooltip: 'Vertical',
        icon: BiMoveVertical,
      },
      {
        value: 'y',
        icon: BiMoveHorizontal,
        tooltip: 'Horizontal',
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
        key: 'borderWidth',
        label: 'Border Width',
        type: ESetting.NUMBER_FIELD,
        defaultValue: 1,
      },
      {
        key: 'borderRadius',
        label: 'Border Radius',
        type: ESetting.NUMBER_FIELD,
        defaultValue: 0,
      },
      {
        key: 'borderSkipped',
        label: 'Border Skipped',
        type: ESetting.SELECT,
        defaultValue: 'start',
        options: [
          { value: 'start', label: 'Start' },
          { value: 'end', label: 'End' },
          { value: 'middle', label: 'Middle' },
          { value: 'bottom', label: 'Bottom' },
          { value: 'left', label: 'Left' },
          { value: 'top', label: 'Top' },
          { value: 'right', label: 'Right' },
          { value: 'false', label: 'All' },
          { value: 'true', label: 'None' },
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
