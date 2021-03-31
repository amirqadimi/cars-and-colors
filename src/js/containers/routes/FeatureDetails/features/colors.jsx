import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ButtonLink from 'js/components/ButtonLink';
import Loading from 'js/components/Loading';
import { connect } from 'js/store/connect';
import routes from 'js/utils/routes';
import styles from './styles.scss';

export const COLORS = [
	{
		name: 'black',
		code: '#0D1117', 
	},
	{
		name: 'blue',
		code: '#0071BC', 
	},
	{
		name: 'white',
		code: '#E6E6E6', 
	}
];

const SelectColor = ({selected_color, setColor, setIsFullLoadingUp, setCurrentLoading, loading_status}) => {
	let time;
	const active_ref = React.useRef(null);
	const square_ref = React.useRef(null);
	const parent_ref = React.useRef(null);
	const [square_left, setSquareLeft] = React.useState(0);
	const [is_loading_colors, setIsLoadingColors] = React.useState(true);

	const onSelect = () => new Promise((resolve) => {
		setIsFullLoadingUp(true);
		time = setTimeout(()=>{
			resolve();
		}, 420);
	});

	React.useEffect(()=>{
		return () => {
			if(time) {
				clearTimeout(time);
			}
			setColor(null);
		};
	}, []);

	const setSquarePosition = () => {
		const active_rect = active_ref.current.getBoundingClientRect();
		const parent_rect = parent_ref.current.getBoundingClientRect();
		const active_left = active_rect.left - parent_rect.left - 6;
		setSquareLeft(active_left);
	};

	React.useLayoutEffect(()=>{
		const sum = (loading_status.black_to_blue || 0) + (loading_status.black_to_white || 0) + (loading_status.blue_to_white || 0);
		setIsLoadingColors(sum < 300);
		setCurrentLoading(sum / 3);
	}, [loading_status.black_to_blue, loading_status.black_to_white, loading_status.blue_to_white]);

	React.useLayoutEffect(()=>{
		if (selected_color && !is_loading_colors) {
			setSquarePosition();
			window.addEventListener('resize', setSquarePosition);
		}
		return () => {
			window.removeEventListener('resize', setSquarePosition);
		};
	}, [selected_color]);

	return (
		<div className='page'>
			<div className={styles.colors}>
				<div className={styles.inner}>
					<h3>Exterior color</h3>
					<div ref={parent_ref} className={styles.wrap}>
						<div 
							ref={square_ref} 
							className={cn(styles.square, {
								[styles.show]: square_left && !is_loading_colors
							})} 
							style={{transform: `translateX(${Math.round(square_left)}px)`}} 
						/>
						{!is_loading_colors ? (
							<ul>
								{COLORS.map( color => (
									<li key={color.name}>
										<button 
											style={{backgroundColor: color.code}} 
											onClick={() => setColor(color.name)}
											{...(selected_color === color.name ? {ref: active_ref} : {})}
										/>
									</li>
								))}
							</ul>
						) : (
							<Loading className={styles.loading}/>
						)}
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<div className='container flex-end'>
					<ButtonLink to={routes.home.path} beforeDirect={onSelect}>Done</ButtonLink>
				</div>
			</div>
		</div>
	);
};

SelectColor.propTypes = {
  selected_color: PropTypes.oneOf(COLORS),
  setColor: PropTypes.func,
  setIsFullLoadingUp: PropTypes.func,
  setCurrentLoading: PropTypes.func,
  loading_status: PropTypes.object,
};

export default connect( ({color, setColor, setIsFullLoadingUp, setCurrentLoading, loading_status}) => ({
	selected_color: color,
	setColor,
	setIsFullLoadingUp,
	setCurrentLoading,
	loading_status,
}))(SelectColor);