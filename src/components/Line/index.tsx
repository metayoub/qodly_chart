import config, { ILineProps } from './Line.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Line.build';
import Render from './Line.render';

const Line: T4DComponent<ILineProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Line.craft = config.craft;
Line.info = config.info;
Line.defaultProps = config.defaultProps;

export default Line;
