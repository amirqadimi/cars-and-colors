import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouteMatch } from 'react-router-dom';
import ButtonLoading from 'js/components/ButtonLoading';
import { BUTTON_SIZE } from 'js/components/Button';
import { SEQUENCE } from 'js/containers/Layout/background/constance';
import { connect } from 'js/store/connect';
import styles from './styles.scss';

export const FEATURES = {
  interior: 'interior',
  exterior: 'exterior',
  colors: 'colors',
  wheels: 'wheels',
};

export const nav = [
  {
    name: FEATURES.interior,
    is_disabled: true,
  },
  {
    name: FEATURES.exterior,
    is_disabled: true,
  },
  {
    name: FEATURES.colors,
    sequence: SEQUENCE.to_colors.name,
  },
  {
    name: FEATURES.wheels,
    is_disabled: true,
  },
];

const NavButton = ({ className, is_loading, children, ...rest }) => (
  <div
    {...rest}
    className={cn(styles.link, className, {
      [styles.isLoading]: is_loading,
    })}
  >
    {children}
  </div>
);

NavButton.propTypes = {
  className: PropTypes.string,
  is_loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const SelectFeature = () => {
  const { url } = useRouteMatch();

  return (
    <React.Fragment>
      <div className={styles.select}>
        <ul>
          {nav.map( ({name, sequence, is_disabled}) => (
            <li key={name} className={cn({
              [`${styles.disabled}`]: is_disabled,
            })}>
              {sequence ? (
                <ButtonLoading
                  sequence={sequence}
                  url={`${url}/${FEATURES[name]}`}
                  component={NavButton}
                  size={BUTTON_SIZE.MD}
                >
                  {name}
                </ButtonLoading>
              ) : (
                <NavButton>{name}</NavButton>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.text}><span>DISCOVER YOUR INSPIRATION</span></div>
    </React.Fragment>
  );
};

SelectFeature.propTypes = {
  loading_status: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect( ({loading_status}) => ({
  loading_status,
}))(SelectFeature);
