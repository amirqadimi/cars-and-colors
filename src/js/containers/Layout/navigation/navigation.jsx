import React from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import Link from 'js/components/Link';
import { useOutsideClick } from 'js/utils';
import pages from './pages';
import styles from './styles.scss';

const Navigation = () => {
  const [is_open, setOpen] = React.useState(false);
  const location = useLocation();
  const path_name = location.pathname;
  const menu_ref = React.useRef();

  useOutsideClick(menu_ref, () => {
    setOpen(false);
  });

  return (
    <div ref={menu_ref} className={cn(styles.wrap, {
      [`${styles.open}`] : is_open,
    })}>
      <button className={styles.btn} onClick={() => setOpen(!is_open)}>
        <span/><span/><span/>
      </button>
      <nav className={styles.nav}>
        <ul>
          {pages.map( page => (
            <li key={page.title}>
              <Link disabled={page.is_disabled} to={page.path} className={cn(styles.link, {
                [`${styles.active}`]: page.path === path_name,
                [`${styles.disabled}`]: page.is_disabled,
              })}><span>{page.title}</span></Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;