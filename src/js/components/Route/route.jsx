import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

const RouteComponent = ({ page_info, component: Component, ...rest}) => {
	const { title, description} = page_info;
	
	return (
		<Route {...rest}>
			<Helmet>
				<title>{`${title}${description ? `| ${description}` : ''}`}</title>
			</Helmet>
			<Component {...rest} />
		</Route>
	);
};

RouteComponent.propTypes = {
	page_info: PropTypes.object.isRequired,
	component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
};

export default RouteComponent;