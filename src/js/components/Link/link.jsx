import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const LinkComp = ({disabled, to, children, ...props}) => {
  const location = useLocation();

  if (disabled || to === location.pathname) {
    return <div {...props}>{children}</div>;
  } 
    return <Link to={to} {...props}>{children}</Link>;
  
};

LinkComp.propTypes = {
  disabled: PropTypes.bool,
  to: PropTypes.string,
  children: PropTypes.node,
};

export default LinkComp;