import models_bg from 'images/sequences/to_features/frame_0.jpg';
import { MODELS } from 'js/containers/routes/SelectModel';
import { FEATURES } from 'js/containers/routes/Features/select-feature';
import routes from 'js/utils/routes';

export const SEQUENCE = {
	to_models: 'to_models',
	to_features: 'to_features',
	to_colors: 'to_colors',
	black_to_blue: 'black_to_blue',
	black_to_white: 'black_to_white',
	blue_to_white: 'blue_to_white',

	blue_to_black: 'blue_to_black',
	white_to_black: 'white_to_black',
	white_to_blue: 'white_to_blue',
};

let data = {
	prev_color: null,
	imageSize: {
		original: {
			width: 1920,
			height: 1080,
		},
		cover: {}
	},
	canvas: {
		dom: null,
		context: null,
		width: null,
		height: null,
	},
	models: {
		image: null,
	},
	[SEQUENCE.to_features]: {
		images: [],
		totalFrames: 43,
		file_names: []
	},
	[SEQUENCE.to_colors]: {
		images: [],
		totalFrames: 41,
		file_names: []
	},
	[SEQUENCE.black_to_blue]: {
		images: [],
		totalFrames: 20,
		file_names: []
	},
	[SEQUENCE.black_to_white]: {
		images: [],
		totalFrames: 21,
		file_names: []
	},
	[SEQUENCE.blue_to_white]: {
		images: [],
		totalFrames: 21,
		file_names: []
	},
};

const getCoverSize = (contentWidth, contentHeight, containerWidth, containerHeight, offsetLeft, offsetTop) => {
	const contentRatio = contentWidth / contentHeight;
	const containerRatio = containerWidth / containerHeight;
	let resultHeight;
	let resultWidth;
	offsetLeft = typeof offsetLeft === 'undefined' ? 0.5 : offsetLeft;
	offsetTop = typeof offsetTop === 'undefined' ? 0.5 : offsetTop;
	if (contentRatio > containerRatio) {
			resultHeight = containerHeight;
			resultWidth = Math.ceil(containerHeight * contentRatio);
	} else {
			resultWidth = containerWidth;
			resultHeight = Math.ceil(containerWidth / contentRatio);
	}
	return {
			width: resultWidth,
			height: resultHeight,
			offsetLeft: Math.ceil((containerWidth - resultWidth) * offsetLeft),
			offsetTop: Math.ceil((containerHeight - resultHeight) * offsetTop)
	};
};

const clearImage = () => {
	data.canvas.context.clearRect(0, 0, data.canvas.width, data.canvas.height);
};

const setImage = (sequence, newLocation, static_image) => {
	const image = static_image ? static_image : data[sequence].images[newLocation];
	clearImage();
	data.canvas.context.drawImage(
		image, 
		data.imageSize.cover.offsetLeft,
    data.imageSize.cover.offsetTop,
    data.imageSize.cover.width,
		data.imageSize.cover.height
	);
};

const checkPage = sequence => {
	const {current_page} = data.props;

	switch (sequence) {
		case SEQUENCE.to_models:
			return current_page === routes.models.path;
		case SEQUENCE.to_features:
			return current_page === `${routes.models.path}/${MODELS.bugatti}`;
		case SEQUENCE.to_colors:
		case SEQUENCE.black_to_blue:
		case SEQUENCE.black_to_white:
		case SEQUENCE.blue_to_white:
			return current_page === `${routes.models.path}/${MODELS.bugatti}/${FEATURES.colors}`;
		default:
			return null;
	}
};

const showFrames = (sequence, is_reversed, is_the_same) => {
	const is_on_currect_page = checkPage(sequence);

	if (!is_on_currect_page) {
		return;
	}
	const { totalFrames } = data[sequence];
	let current_frame = is_reversed ? (totalFrames - 1) : 0;

	const loop = () => {

		if (is_reversed){
			current_frame -= 1;
		} else {
			current_frame += 1;
		}

		setImage(sequence, is_the_same ? totalFrames - 1 : current_frame);

		if (!(current_frame + 1 >= data[sequence].totalFrames) && !current_frame <= 0 && !is_the_same){
			requestAnimationFrame(loop);
		}
	};

	loop();
};

const getPercentage = (sequence, count) => Math.floor((count*100)/data[sequence].totalFrames);

const getIsLoading = (sequence) => {
	const { loading_status} = data.props;
	return !isNaN(loading_status[sequence]) ? loading_status[sequence] : null;
};

const LoadImages = (sequence) => new Promise( ( resolve ) => {
	const { setIsLoading } = data.props;

	if(getIsLoading(sequence) !== null) {
		return;
	}
	
	if(sequence === SEQUENCE.to_models) {
		
		setIsLoading(SEQUENCE.to_models, 0);
		const models_image = new Image;
		models_image.src = models_bg;
		models_image.onload = () => {
			data = {
				...data,
				models: {
					image: models_image
				}
			};
			setIsLoading(SEQUENCE.to_models, 100);
			resolve();
		};
		return;
	}
	
	for (let i = 0; i < data[sequence].totalFrames; i++) {
		const file_name = `frame_${i}.jpg`;
		data[sequence].file_names.push(file_name);
	}
	let count = 0;
	setIsLoading(sequence, 0);
	const all_frames = data[sequence].file_names.map( file_name => new Promise( ( resolve ) => {
		const img = new Image;
		img.src = require(`images/sequences/${sequence}/${file_name}`).default;
		data[sequence].images.push(img);
		img.onload = () => {
			count += 1;
			setIsLoading(sequence, getPercentage(sequence, count));
			resolve();
		};
	}));
	
	Promise.all(all_frames).then( () => {
		data = {
			...data,
			[sequence]: {
				...data[sequence],
			}
		};
		resolve();
	});
});

const setSize = () => {
	const imageCoverSize = getCoverSize(
    data.imageSize.original.width,
    data.imageSize.original.height,
    innerWidth,
    innerHeight
	);
	data = {
		...data,
		imageSize: {
			...data.imageSize,
			cover: imageCoverSize
		},
		canvas: {
			...data.canvas,
			width: innerWidth,
			height: innerHeight
		}
	};
	data.canvas.dom.width = data.canvas.width;
	data.canvas.dom.height = data.canvas.height;
};

const checkSize = () => {
	if (data.canvas.dom.width !== innerWidth || data.canvas.dom.height !== innerHeight) {
		setSize();
		drawImage();
	}
	requestAnimationFrame(checkSize);
};

const getSequence = (color) => {
	const prev_color = data.prev_color;
	const prev = prev_color ? prev_color : 'black';
	let prev_to_selected = `${prev}_to_${color}`;
	let is_reversed = false;
	let is_the_same = color === prev_color;

	if (!data[prev_to_selected]) {
		switch (prev_to_selected) {
			case SEQUENCE.blue_to_black:
				prev_to_selected = SEQUENCE.black_to_blue;
				break;
			case SEQUENCE.white_to_black:
				prev_to_selected = SEQUENCE.black_to_white;
				break;
			case SEQUENCE.white_to_blue:
				prev_to_selected = SEQUENCE.blue_to_white;
				break;
			case 'black_to_black':
				prev_to_selected = SEQUENCE.to_colors;
				break;
			default:
				prev_to_selected = `black_to_${color}`;
				break;
		}
		is_reversed = true;
	}

	return {
		prev_to_selected,
		is_reversed,
		is_the_same
	};
};

const showColor = () => {
	const { color, setLoadingSequence } = data.props;
	
	if (!data.prev_color && color === 'black') {
		return;
	}
	
	const sequence = getSequence(color);
	const {prev_to_selected, is_reversed, is_the_same} = sequence;

	setLoadingSequence(prev_to_selected);
	
	if(getIsLoading(prev_to_selected) === null) {
		LoadImages(prev_to_selected).then( ()=> {
			showFrames(prev_to_selected, is_reversed, is_the_same);
		});
	} else if(getIsLoading(prev_to_selected) >= 100) {
		showFrames(prev_to_selected, is_reversed, is_the_same);
	}
	data = {
		...data,
		prev_color: color
	};
};

const drawImage = () => {
	const { 
		current_page,
		is_on_features,
		is_on_colors,
		color 
	} = data.props;
	
	if (is_on_features) {
		if (getIsLoading(SEQUENCE.to_features) !== 100) {
			LoadImages(SEQUENCE.to_features).then( ()=> {
				showFrames(SEQUENCE.to_features);
			});
		} else {
			showFrames(SEQUENCE.to_features);
			LoadImages(SEQUENCE.to_colors).then( ()=> {
				LoadImages(SEQUENCE.black_to_blue).then(() =>{
					LoadImages(SEQUENCE.black_to_white).then(()=>{
						LoadImages(SEQUENCE.blue_to_white);
					});
				});
			});
		}
	} else if(is_on_colors){
		if(getIsLoading(SEQUENCE.to_colors) !== 100){
			LoadImages(SEQUENCE.to_colors).then( ()=> {
				showFrames(SEQUENCE.to_colors);
			});
		} else {
			if (color) {
				showColor();
			} else {
				showFrames(SEQUENCE.to_colors);
			}
		}
	} else if (current_page === '/models') {
		if (getIsLoading(SEQUENCE.to_models) !== 100) {
			LoadImages(SEQUENCE.to_models).then( ()=> {
				setImage(null, null, data.models.image);
				if (getIsLoading(SEQUENCE.to_features) === null) {
					LoadImages(SEQUENCE.to_features);
				}
			});
		} else {
			setImage(null, null, data.models.image);
		}
	} else {
		clearImage();
	}
};

const Canvas = (
	canvas, 
	current_page, 
	is_on_features, 
	is_on_colors, 
	setIsLoading,
	loading_status,
	setLoadingSequence,
	color
) => {
	data = {
		...data,
		prev_color: color ? data.prev_color : null,
		props: {
			...data.props,
			canvas,
			current_page,
			is_on_features,
			is_on_colors,
			setIsLoading,
			loading_status,
			setLoadingSequence,
			color
		},
		canvas: {
			...data.canvas,
			dom: canvas,
			context: canvas.getContext('2d')
		}
	};
	checkSize();
	drawImage();
};

export default Canvas;
