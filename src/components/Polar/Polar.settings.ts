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
    key: 'tick',
    label: 'Display ticks',
    type: ESetting.CHECKBOX,
  },
  {
    key: 'tooltipLabel',
    label: 'tooltipLabel',
    type: ESetting.TEXT_FIELD,
    defaultValue: 'Value',
  },
  {
    type: ESetting.DATAGRID,
    key: 'colors',
    name: 'Colors',
    label: 'Colors',
    data: [
      {
        key: 'color',
        label: 'Color',
        type: ESetting.COLOR_PICKER,
      },
    ],
  },
  {
    key: 'min',
    label: 'Suggested Min',
    type: ESetting.NUMBER_FIELD,
  },
  {
    key: 'max',
    label: 'Suggested Max',
    type: ESetting.NUMBER_FIELD,
  },
  {
    key: 'step',
    label: 'Suggested Step',
    type: ESetting.NUMBER_FIELD,
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
