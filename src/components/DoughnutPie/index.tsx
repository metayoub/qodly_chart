import config, { IDoughnutPieProps } from './DoughnutPie.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './DoughnutPie.build';
import Render from './DoughnutPie.render';

const DoughnutPie: T4DComponent<IDoughnutPieProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

DoughnutPie.craft = config.craft;
DoughnutPie.info = config.info;
DoughnutPie.defaultProps = config.defaultProps;

export default DoughnutPie;
