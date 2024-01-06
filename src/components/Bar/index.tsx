import config, { IBarProps } from './Bar.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Bar.build';
import Render from './Bar.render';

const Bar: T4DComponent<IBarProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Bar.craft = config.craft;
Bar.info = config.info;
Bar.defaultProps = config.defaultProps;

export default Bar;
