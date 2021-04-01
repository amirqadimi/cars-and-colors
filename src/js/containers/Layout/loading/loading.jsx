import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { SEQUENCE } from 'js/containers/Layout/background/constance';
import { connect } from 'js/store/connect';
import styles from './styles.scss';

const Loading = ({ current_sequence, current_loading, loading_status, is_full_loading_up}) => {
  const [is_first_load, setIsFirstLoad] = React.useState(true);

  React.useEffect(() => {
    if (!is_full_loading_up) {
      setIsFirstLoad(false);
    }
  }, [is_full_loading_up]);
  const loading = current_loading ? current_loading : loading_status[current_sequence];
  return (
    <React.Fragment>
      <div className={cn(styles.fullLoading, {
        [styles.isUp]: is_full_loading_up && !is_first_load,
        [styles.isDown]: !is_full_loading_up,
      })}/>
      <div className={cn(styles.loading, {
        [styles.hide]: !loading || loading >= 100,
      })}>
        <span style={{transform: `translateX(${loading - 100}%)`}}/>
      </div>
    </React.Fragment>
  );
};

Loading.propTypes = {
  current_sequence: PropTypes.oneOf(Object.keys(SEQUENCE)),
  current_loading: PropTypes.number,
  loading_status: PropTypes.object,
  is_full_loading_up: PropTypes.bool,
};

export default connect( ({current_sequence, current_loading, is_full_loading_up, loading_status}) => ({
  current_sequence,
  current_loading,
  loading_status,
  is_full_loading_up,
}))(Loading);