import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {useLocation, useRouteMatch} from 'react-router-dom';
import { connect } from 'js/store/connect';
import { COLORS } from 'js/containers/routes/FeatureDetails/features/colors';
import { FEATURES } from 'js/containers/routes/Features/select-feature';
import routes from 'js/utils/routes';
import { usePrevious } from 'js/utils/custom-hooks';
import { SEQUENCE } from './constance';
import getColorSequence from './get-color-sequence';
import loadImags from './load-images';
import showFrames from './show-frames';
import styles from './styles.scss';

const Background = ({
  color, setIsLoading, current_sequence, setCurrentSequnce, is_full_loading_up, setIsFullLoadingUp,
}) => {
  const location = useLocation();
  const current_page = location.pathname;
  const models_url = routes.models.path;
  const match_models = useRouteMatch(models_url);
  const match_features = useRouteMatch(`${models_url}/:modelId`);
  const match_feature = useRouteMatch(`${models_url}/:modelId/:featureId`);
  const canvas_ref = React.useRef();
  const prev_color = usePrevious(color);
  const [images, setImages] = React.useState({});
  let time;

  const setSize = () => {
    if (images[current_sequence]) {
      showFrames(canvas_ref.current, images, current_sequence, false, true);
    }
  };

  React.useEffect(() => {
    const sequences = Object.values(SEQUENCE);

    sequences.forEach(sequence => setIsLoading(sequence.name, 0));
    loadImags(setImages, setIsLoading);
  }, []);

  React.useLayoutEffect(() => {
    let sequence;
    const is_on_models = match_models?.isExact;
    const is_on_features = match_features?.isExact;
    const is_on_colors = match_feature?.isExact && (match_feature.params.featureId === FEATURES.colors);

    if (is_on_models) {
      sequence = SEQUENCE.to_models.name;
    } else if (is_on_features) {
      sequence = SEQUENCE.to_features.name;
    } else if (is_on_colors) {
      sequence = SEQUENCE.to_colors.name;
    }

    setCurrentSequnce(sequence);

    if (images[sequence]) {
      showFrames(canvas_ref.current, images, sequence);
    }

    window.addEventListener('resize', setSize);

    return () => {
      window.removeEventListener('resize', setSize);
      clearTimeout(time);
    };

  }, [current_page, images[current_sequence]]);

  React.useLayoutEffect(() => {
    const is_on_colors = match_feature?.isExact && (match_feature.params.featureId === FEATURES.colors);
    const { sequence, is_reversed, is_the_same } = getColorSequence(prev_color, color);

    if (color && is_on_colors && images[sequence]) {
      showFrames(canvas_ref.current, images, sequence, is_reversed, is_the_same);
    }
  }, [color, images[current_sequence]]);

  React.useEffect( () => {
    if (images[current_sequence]) {
      time = setTimeout(() => {
        setIsFullLoadingUp(false);
      }, 100);
    }
  }, [images[current_sequence]]);

  return (
    <div className={cn(styles.canvas, {
      [styles.normal]: !is_full_loading_up,
    })}>
      <canvas ref={canvas_ref}/>
    </div>
  );
};

Background.propTypes = {
  color: PropTypes.oneOf(COLORS),
  setColor: PropTypes.func,
  setIsLoading: PropTypes.func,
  current_sequence: PropTypes.oneOf(Object.keys(SEQUENCE)),
  setCurrentSequnce: PropTypes.func,
  is_full_loading_up: PropTypes.bool,
  setIsFullLoadingUp: PropTypes.func,
};

export default connect(({
  color, setColor, setIsLoading, current_sequence, setCurrentSequnce, is_full_loading_up, setIsFullLoadingUp,
}) => ({
  color,
  setColor,
  setIsLoading,
  current_sequence,
  setCurrentSequnce,
  is_full_loading_up,
  setIsFullLoadingUp,
}))(Background);