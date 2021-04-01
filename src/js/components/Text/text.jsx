import React from 'react';
import PropTypes from 'prop-types';

const ProductNav = ({ tag, size, weight, color, margin, custom_styles, children}) => {
  const Tag = tag === 'p' ? 'p' : 'span';

  const styles = {
    fontSize: `var(--font-size-${size})`,
    fontWeight: `var(--font-weight-${weight})`,
    color: `var(--color-${color})`,
    margin: margin,
    ...custom_styles,
  };

  return (
    <Tag style={styles}>{children}</Tag>
  );
};

ProductNav.defaultProps = {
  tag: 'p',
  size: 'md',
  weight: 'normal',
  color: 'white',
  margin: '0 0 1.5rem',
};

ProductNav.propTypes = {
  tag: PropTypes.oneOf(['p', 'span']),
  size: PropTypes.oneOf(['xxlg', 'xlg', 'lg', 'md', 'sm', 'xs']),
  weight: PropTypes.oneOf(['normal', 'medium', 'bold']),
  color: PropTypes.string,
  margin: PropTypes.string,
  custom_styles: PropTypes.object,
  children: PropTypes.node,
};
export default ProductNav;