import PropTypes from 'prop-types';
import { SEQUENCE } from './constance';

const getPercentage = (name, count) => Math.floor((count * 100) / SEQUENCE[name].total_frames);

const loadImages = (setImages, setIsLoading) => {

  const sequences = Object.values(SEQUENCE);

  let index = 0;
  const loadSequence = () => {
    const sequence_images = [];
    const { name, total_frames } = sequences[index];
    const is_to_models = name === SEQUENCE.to_models.name;

    let count = 0;
    for (let i = 0; i < total_frames; i++) {
      const file_name = `frame_${i}.jpg`;

      const image = new Promise( ( resolve ) => {
        const img = new Image();
        img.src = require(`images/sequences/${is_to_models ? `to_features` : name}/${file_name}`).default;
        img.onload = () => {
          count += 1;
          setIsLoading(name, getPercentage(name, count));
          resolve(img);
        };
      });

      sequence_images.push(image);
    }

    Promise.all(sequence_images).then( imgs => {
      setImages( images => ({
        ...images,
        [name]: imgs,
      }));
      index += 1;
      if (sequences[index]) {
        loadSequence(index);
      }
    });
  };

  loadSequence();
};

loadImages.propTypes = {
  setImages: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default loadImages;