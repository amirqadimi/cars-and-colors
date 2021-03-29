import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'js/components/Icon';
import youtube_icon from 'svg/youtube.svg';
import twitter_icon from 'svg/twitter.svg';
import instagram_icon from 'svg/instagram.svg';
import styles from './styles.scss';

const links = [
  {
    title: 'Youtube',
    url: '',
    icon: youtube_icon
  },
  {
    title: 'Twitter',
    url: '',
    icon: twitter_icon
  },
  {
    title: 'Instagram',
    url: '',
    icon: instagram_icon
  },
];

const Socials = ({className}) => (
  <div className={className}>
    {links.map( item => (
      <a className={styles.link} key={item.title} href={item.url} target="_blank" rel="noreferrer" title={item.title}><Icon svg={item.icon}/></a>
    ))}
  </div>
);

Socials.propTypes = {
	className: PropTypes.string
};

export default Socials;
