import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { SEQUENCE } from 'js/containers/Layout/background/constance';
import { MODELS } from 'js/containers/routes/SelectModel';
import Button from 'js/components/Button';
import ButtonLoading from 'js/components/ButtonLoading';
import Icon from 'js/components/Icon';
import arrow_icon from 'svg/arrow.svg';
import styles from './styles.scss';

const ProductNav = () => {
  const { path } = useRouteMatch();
  const url = `${path}/${MODELS.bugatti}`;

  return (
    <div className={styles.nav}>
      <button className={styles.change}><Icon className='flip-v' svg={arrow_icon} /></button>
      <ButtonLoading
        sequence={SEQUENCE.to_features.name}
        url={url}
        component={Button}
      >
					Select
      </ButtonLoading>
      <button className={styles.change}><Icon svg={arrow_icon} /></button>
    </div>
  );
};

export default ProductNav;