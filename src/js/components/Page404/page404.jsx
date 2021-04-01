import React from 'react';
import cn from 'classnames';
import Text from 'js/components/Text';
import styles from './styles.scss';

const Page404 = () => (
  <div className={cn('page flex-center', styles.bg)} >
    <Text size='xxlg'>Page not found!!</Text>
  </div>
);

export default Page404;