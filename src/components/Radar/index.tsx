import config, { IRadarProps } from './Radar.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Radar.build';
import Render from './Radar.render';

const Radar: T4DComponent<IRadarProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Radar.craft = config.craft;
Radar.info = config.info;
Radar.defaultProps = config.defaultProps;

export default Radar;
