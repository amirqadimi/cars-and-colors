import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ svg, className, ...rest }) => (
  <svg className={className} viewBox={svg.viewBox} {...rest}>
    <use xlinkHref={`#${svg.id}`} />
  </svg>
);

Icon.propTypes = {
  svg: PropTypes.object,
  className: PropTypes.string
};

export default Icon;