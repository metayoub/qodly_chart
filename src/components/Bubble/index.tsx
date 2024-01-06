import config, { IBubbleProps } from './Bubble.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Bubble.build';
import Render from './Bubble.render';

const Bubble: T4DComponent<IBubbleProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Bubble.craft = config.craft;
Bubble.info = config.info;
Bubble.defaultProps = config.defaultProps;

export default Bubble;
