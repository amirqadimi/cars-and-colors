import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { SEQUENCE } from 'js/containers/Layout/background/constance';
import { connect } from 'js/store/connect';
import styles from './styles.scss';

const Loading = ({ current_sequence, loading_status, is_full_loading_up}) => {
	const [is_first_load, setIsFirstLoad] = React.useState(true);

	React.useEffect(() => {
		if (!is_full_loading_up) {
			setIsFirstLoad(false);
		}
	}, [is_full_loading_up]);
	
	return (
		<React.Fragment>
			<div className={cn(styles.fullLoading, {
				[styles.isUp]: is_full_loading_up && !is_first_load,
				[styles.isDown]: !is_full_loading_up
			})}/>
			<div className={cn(styles.loading, {
				[styles.hide]: !loading_status[current_sequence] || loading_status[current_sequence] >= 100
			})}>
				<span style={{transform: `translateX(${loading_status[current_sequence] - 100}%)`}}/>
			</div>
		</React.Fragment>
	);
};

Loading.propTypes = {
	current_sequence: PropTypes.oneOf(Object.keys(SEQUENCE)),
	loading_status: PropTypes.object,
	is_full_loading_up: PropTypes.bool,
};

export default connect( ({current_sequence, is_full_loading_up, loading_status}) => ({
	current_sequence,
	loading_status,
	is_full_loading_up,
}))(Loading);