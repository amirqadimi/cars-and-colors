import React from 'react';
import cn from "classnames";
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { SEQUENCE } from 'js/containers/Layout/background/constance';
import { BUTTON_COLOR, BUTTON_SIZE } from 'js/components/Button';
import { connect } from 'js/store/connect';
import styles from './styles.scss';

const ButtonLoading = ({
	sequence, 
	url, 
	loading_status, 
	setCurrentSequnce, 
	className, 
	component, 
	color, 
	size, 
	callBack, 
	children,
	...rest
}) => {
	let history = useHistory();
	const [is_loading, setIsloading] = React.useState(false);

	const runAction = () => {
		setIsloading(false);
		if(url) {
			history.push(url);
		} else if (typeof callBack === 'function') {
			callBack();
		}
	};

	const onClick = () => {
		if (loading_status[sequence] < 100){
			setIsloading(true);
		} else {
			runAction();
		}
	};
	
	React.useEffect( ()=> {
		const status = loading_status[sequence];
		
		if (status >= 100 && is_loading){
			runAction();
		}
	}, [loading_status[sequence]]);

	const Component = component ? component : 'div';
	
  return (
		<Component
			{...rest}
			className={cn(className, styles.btn, {
				[styles.isLoading] : is_loading
			})}
			is_loading={is_loading}
			onClick={onClick}
		><div className={cn(styles.loading, styles[color], styles[size])}/>{children && <div className={styles.content}>{children}</div>}</Component>);
};

ButtonLoading.propTypes = {
	component: PropTypes.elementType,
	children: PropTypes.node,
	className: PropTypes.string,
	color: PropTypes.oneOf(Object.values(BUTTON_COLOR)),
	size: PropTypes.oneOf(Object.values(BUTTON_SIZE)),
	url: PropTypes.string,
	callBack: PropTypes.func,
	loading_status: PropTypes.object,
	setCurrentSequnce: PropTypes.func,
	sequence: PropTypes.oneOf(Object.keys(SEQUENCE)).isRequired,
};

ButtonLoading.defaultProps = {
	color: BUTTON_COLOR.PRIMARY,
	size: BUTTON_SIZE.LG,
};

export default connect( ({loading_status, setCurrentSequnce}) => ({
	loading_status,
	setCurrentSequnce
}))(ButtonLoading);