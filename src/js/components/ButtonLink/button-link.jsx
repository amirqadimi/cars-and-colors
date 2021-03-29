import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.scss';

const ButtonLink = ({  className, color, children, beforeDirect, to, ...rest }) => {
	let history = useHistory();
	const hasBeforeDirect = typeof beforeDirect === 'function';
	const Component = hasBeforeDirect ? 'div' : <Link/>;

	const onClick = () => {
		beforeDirect().then(()=>{
			history.push(to);
		});
	};
	
	return (
		<Component 
			{...rest}
			{...(hasBeforeDirect ? {onClick} : {to})}
			className={cn(className, styles.link, styles[color])}
		>
			{children}
		</Component>
	);
};

ButtonLink.defaultProps = {
	color: 'success'
};

ButtonLink.propTypes = {
  className: PropTypes.string,
	children: PropTypes.node.isRequired,
	color: PropTypes.oneOf(['success']).isRequired,
	beforeDirect: PropTypes.func,
	to: PropTypes.string,
};

export default ButtonLink;