import PropTypes from 'prop-types';

const getCanvasCoverSize = (contentWidth, contentHeight, containerWidth, containerHeight, offsetLeft, offsetTop) => {
  const contentRatio = contentWidth / contentHeight;
  const containerRatio = containerWidth / containerHeight;
  let resultHeight;
  let resultWidth;
  const offset_left_value = typeof offsetLeft === 'undefined' ? 0.5 : offsetLeft;
  const offset_top_value = typeof offsetTop === 'undefined' ? 0.5 : offsetTop;

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
    offsetLeft: Math.ceil((containerWidth - resultWidth) * offset_left_value),
    offsetTop: Math.ceil((containerHeight - resultHeight) * offset_top_value),
  };
};

getCanvasCoverSize.propTypes = {
  contentWidth: PropTypes.number.isRequired,
  contentHeight: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number,
};

export default getCanvasCoverSize;