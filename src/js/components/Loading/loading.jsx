import React from 'react';
import cn from "classnames";
import PropTypes from 'prop-types';
import { BUTTON_COLOR, BUTTON_SIZE } from 'js/components/Button';
import styles from './styles.scss';

const Loading = ({
	className,
	color,
	size,
}) => (
	<div className={cn(className, styles.loading, styles[color], styles[size])}/>
);

Loading.propTypes = {
	className: PropTypes.string,
	color: PropTypes.oneOf(Object.values(BUTTON_COLOR)),
	size: PropTypes.oneOf(Object.values(BUTTON_SIZE)),
};

Loading.defaultProps = {
	color: BUTTON_COLOR.PRIMARY,
	size: BUTTON_SIZE.LG,
};

export default Loading;