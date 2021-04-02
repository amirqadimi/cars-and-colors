import PropTypes from 'prop-types';
import { getCanvasCoverSize } from 'js/utils';
import { SEQUENCE } from './constance';

const clearImage = (canvas, canvas_size) => {
  canvas.getContext('2d').clearRect(0, 0, canvas_size.width, canvas_size.height);
};

const setImage = (canvas, canvas_size, images, sequence, newLocation) => {
  const image = images[sequence][newLocation];
  const image_size = getCanvasCoverSize(
    1920,
    1080,
    canvas_size.width,
    canvas_size.height
  );

  clearImage(canvas, canvas_size);
  canvas.getContext('2d').drawImage(
    image,
    image_size.offsetLeft,
    image_size.offsetTop,
    image_size.width,
    image_size.height
  );
};

let animation_frame;

const showFrames = (canvas, images, sequence, is_reversed, is_the_same) => {
  const { total_frames } = SEQUENCE[sequence];
  const canvas_size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  let current_frame = is_reversed ? (total_frames - 1) : 0;

  /* eslint-disable no-param-reassign */
  canvas.width = canvas_size.width;
  canvas.height = canvas_size.height;
  /* eslint-enable no-param-reassign */
  const loop = () => {
    setImage(canvas, canvas_size, images, sequence, is_the_same ? total_frames - 1 : current_frame);

    if (is_reversed) {
      current_frame -= 1;
    } else {
      current_frame += 1;
    }

    if (!(current_frame + 1 >= total_frames) && !current_frame <= 0 && !is_the_same) {
      animation_frame = requestAnimationFrame(loop);
    }
  };

  if (animation_frame) {
    cancelAnimationFrame(animation_frame);
  }

  loop();
};

showFrames.propTypes = {
  canvas: PropTypes.instanceOf(Element).isRequired,
  images: PropTypes.object.isRequired,
  sequence: PropTypes.string.isRequired,
  is_reversed: PropTypes.bool,
  is_the_same: PropTypes.bool,
};

export default showFrames;