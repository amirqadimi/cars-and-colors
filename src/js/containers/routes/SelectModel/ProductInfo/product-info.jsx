import React from 'react';
import Text from 'js/components/Text';
import styles from './styles.scss';

const ProductNav = () => {

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Beauty & beast</h2>
      <Text>The CHIRON is the fastest, most powerful, and exclusive production super sports car in BUGATTI’s history. 
Its sophisticated design, innovative technology, 
and iconic performance-oriented form make it a unique masterpiece of art, 
form and technique, that pushes boundaries beyond imagination.</Text>
    </div>
  );
};

export default ProductNav;