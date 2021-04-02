import React from 'react';
import { StoreProvider } from 'js/store/connect';
import Layout from 'js/containers/Layout';
import 'styles/base/base.scss';
import RootStore from 'js/store/stores/rootStore';

const store = new RootStore();

const App = () => (
  <StoreProvider store={store}>
    <Layout />
  </StoreProvider>
);


export default App;