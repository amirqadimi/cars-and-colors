import React from 'react';
import Icon from 'js/components/Icon';
import chiron_logo from 'svg/chiron-sport-logo.svg';
import ProductInfo from './ProductInfo';
import ProductNav from './ProductNav';
import styles from './styles.scss';

export const MODELS = {
	bugatti: 'bugatti'
};

const Models = () => (
	<div className='page'>
			<div className='container'>
					<div className='row row--center-v'>
							<div className='col col-3'></div>
							<div className='col col-6'>
									<div className={styles.middle}>
										<h1 className={styles.heading}><Icon className={styles.title} svg={chiron_logo} title="Chiron Sport"/></h1>
										<ProductNav />
									</div>
							</div>
							<div className='col col-3 flex-end'>
									<ProductInfo />
							</div>
					</div>
			</div>
	</div>
);

export default Models;