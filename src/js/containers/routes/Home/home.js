import React from 'react';
import { Redirect } from 'react-router-dom';
import routes from 'js/utils/routes';

const Home = () => (
  <Redirect to={routes.models.path}/>
);

export default Home;