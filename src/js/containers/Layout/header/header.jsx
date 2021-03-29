import React from 'react';
import Link from 'js/components/Link';
import bugatti_logo from 'images/general/bugatti-logo.png';
import Icon from 'js/components/Icon';
import routes from 'js/utils/routes';
import Navigation from '../Navigation';
import location_icon from 'svg/location.svg';
import styles from './styles.scss';

const Header = () => {

  return (
    <div className={styles.header}>
			<Navigation />
			<Link to={routes.home.path} className={styles.logo}><img  src={bugatti_logo} alt='Bugatti logo' /></Link>
			<div className={styles.dealer}>Find a dealer <Icon className={styles.location} svg={location_icon}/></div>
    </div>
  );
};

export default Header;