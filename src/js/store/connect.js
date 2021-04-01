import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

const StoreContext = React.createContext();

export const StoreProvider = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
};

const mapToComponentProps = (mapToProps, baseComponent) => {
  const Component = component_props => {
    const state = React.useContext(StoreContext);

    return baseComponent({...component_props, ...mapToProps(state, component_props)});
  };

  Component.displayName = baseComponent.name;
  Component.propTypes = baseComponent.propTypes;
  Component.defaultProps = baseComponent.defaultProps;

  return observer(Component);
};

export const connect = mapToProps => Component => mapToComponentProps(mapToProps, Component);
