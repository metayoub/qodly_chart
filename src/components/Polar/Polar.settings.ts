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
        key: 'backgroundColor',
        label: 'Background Color',
        type: ESetting.TEXT_FIELD,
      },
      {
        key: 'borderColor',
        label: 'Border Color',
        type: ESetting.TEXT_FIELD,
      },
    ],
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
