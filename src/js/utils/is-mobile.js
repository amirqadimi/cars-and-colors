import { isMobileOnly } from 'react-device-detect';

const isMobile = () => window.innerWidth < 800 || isMobileOnly;

export default isMobile;
