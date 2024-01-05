import config, { IPieProps } from './Pie.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Pie.build';
import Render from './Pie.render';

const Pie: T4DComponent<IPieProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Pie.craft = config.craft;
Pie.info = config.info;
Pie.defaultProps = config.defaultProps;

export default Pie;
