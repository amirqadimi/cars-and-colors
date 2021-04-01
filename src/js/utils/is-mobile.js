import { isMobileOnly } from 'react-device-detect';

const isMobile = () => {
  return innerWidth < 800 || isMobileOnly;
};

export default isMobile;
