import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export const BUTTON_COLOR = {
  PRIMARY: 'primary',
};

export const BUTTON_SIZE = {
  LG: 'lg',
  MD: 'md',
};

const ButtonLink = ({  className, color, size, is_loading, children, ...rest }) => (
  <div
    {...rest}
    className={cn(className, styles.button, styles[color], styles[size],  {
      [styles.isLoading]: is_loading,
    })}
  >
    {children}
  </div>
);

ButtonLink.defaultProps = {
  color: BUTTON_COLOR.PRIMARY,
  size: BUTTON_SIZE.LG,
};

ButtonLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.values(BUTTON_COLOR)).isRequired,
  size: PropTypes.oneOf(Object.values(BUTTON_SIZE)),
  is_loading: PropTypes.bool,
};

export default ButtonLink;