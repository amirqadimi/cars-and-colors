import React from 'react';
import cn from 'classnames';
import Button from 'js/components/Button';
import { isMobile } from 'js/utils';
import styles from './styles.scss';

const ScreenWarning = () => {
  const [is_comfirmed, setIsComfirmed] = React.useState(false);
  const [is_mobile, setIsMobile] = React.useState();

  const checkSize = () => {
    setIsMobile(isMobile());
  };

  React.useEffect( () => {
    checkSize();
    window.addEventListener('resize', checkSize);

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  return (
    <React.Fragment>
      <div className={cn(styles.wrap, styles.portrait)}>
        <div className={styles.content}>
          <div className={styles.phone}/>
          <p>Please rotate your device!</p>
        </div>
      </div>
      {is_mobile && !is_comfirmed && (
        <div className={styles.wrap}>
          <div className={styles.content}>
            <p>This demo website isn't designed for a mobile screen size, please visit on desktop.</p>
            <Button onClick={() => setIsComfirmed(true)}>Continue anyway</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ScreenWarning;