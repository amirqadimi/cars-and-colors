import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'js/store/connect';
import styles from './styles.scss';

const Counter = props => (
    <div className={styles.wrap}>
      <div className={styles.num}>{props.count}</div>
      <button onClick={() => props.addCount()}>+</button>
    </div>
  );

Counter.propTypes = {
  count: PropTypes.num,
  addCount: PropTypes.func,
};

export default connect( ({count, addCount}) => ({
  count,
  addCount,
}))(Counter);