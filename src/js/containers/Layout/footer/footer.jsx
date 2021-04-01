import React from 'react';
import Socials from 'js/components/Socials';
import styles from './styles.scss';

const Footer = () => {

  return (
    <div className={styles.footer}>
      <div className={styles.language}>English</div>
      <Socials className={styles.socialsWrap}/>
      <div className={styles.about}>MD-GH</div>
    </div>
  );
};

export default Footer;