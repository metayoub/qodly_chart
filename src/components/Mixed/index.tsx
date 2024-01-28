import config, { IMixedProps } from './Mixed.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Mixed.build';
import Render from './Mixed.render';

const Mixed: T4DComponent<IMixedProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Mixed.craft = config.craft;
Mixed.info = config.info;
Mixed.defaultProps = config.defaultProps;

export default Mixed;
