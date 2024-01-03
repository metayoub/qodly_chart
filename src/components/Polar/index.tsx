import config, { IPolarProps } from './Polar.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Polar.build';
import Render from './Polar.render';

const Polar: T4DComponent<IPolarProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Polar.craft = config.craft;
Polar.info = config.info;
Polar.defaultProps = config.defaultProps;

export default Polar;
