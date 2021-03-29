import PropTypes from 'prop-types';
import { SEQUENCE } from './constance';

const getColorSequence = (prev_color, color) => {
	const prev = prev_color ? prev_color : 'black';
	let sequence = `${prev}_to_${color ? color : 'black'}`;
	let is_reversed = false;
	let is_the_same = color && prev_color && color === prev_color;

	if (!SEQUENCE[sequence]) {
		is_reversed = true;
		switch (sequence) {
			case 'blue_to_black':
				sequence = SEQUENCE.black_to_blue.name;
				break;
			case 'white_to_black':
				sequence = SEQUENCE.black_to_white.name;
				break;
			case 'white_to_blue':
				sequence = SEQUENCE.blue_to_white.name;
				break;
			case 'black_to_black':
				sequence = SEQUENCE.to_colors.name;
				is_reversed = false;
				is_the_same = true;
				break;
			default:
				sequence = `black_to_${color}`;
				is_reversed = false;
				break;
		}
	}

	return {
		sequence,
		is_reversed,
		is_the_same
	};
};

getColorSequence.propTypes = {
	prev_color: PropTypes.string, 
	color: PropTypes.string
};

export default getColorSequence;