import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'type',
    label: 'Type',
    type: ESetting.SELECT,
    isClearable: false,
    options: [
      {
        label: 'Pie',
        value: 'pie',
      },
      {
        label: 'Doughnut',
        value: 'doughnut',
      },
    ],
    isSearchable: false,
  },
  {
    type: ESetting.DATAGRID,
    key: 'labels',
    name: 'Labels',
    label: 'Labels',
    data: [
      {
        key: 'title',
        label: 'Title',
        type: ESetting.TEXT_FIELD,
        defaultValue: '',
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
