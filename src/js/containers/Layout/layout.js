import React from 'react';
import {
	HashRouter as Router,
} from "react-router-dom";
import Background from './background';
import Footer from './footer';
import Header from './header';
import Loading from './loading';
import Routes from './routes';

const Layout = () => {
	
	
  return (
		<Router>
			<Background />
			<Loading/>
			<Header/>
			<Routes />
			<Footer />
		</Router>
  );
};

export default Layout;