import React from 'react';
import {
		Switch,
		useLocation
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page404 from 'js/components/Page404';
import Route from 'js/components/Route';
import Home from 'js/containers/routes/Home';
import Features from 'js/containers/routes/Features';
import FeatureDetails from 'js/containers/routes/FeatureDetails';
import SelectModel from 'js/containers/routes/SelectModel';
import routes_data from "js/utils/routes";

const classNames = {
	appear: 'page-appear',
	appearActive: 'page-active-appear',
	appearDone: 'page-done-appear',		
	enter: 'page-enter',
	enterActive: 'page-ative-enter',
	enterDone: 'page-done-enter',
	exit: 'page-exit',
	exitActive: 'page-active-exit',
	exitDone: 'page-done-exit',
};

const Routes = () => {
  const { home, models, page404 } = routes_data;
	const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        timeout={2000}
        classNames={classNames}>
        <Switch location={location}>
            <Route page_info={home} path={home.path} exact component={Home}/>
            <Route page_info={models.routes.select_model} path={models.path} exact component={SelectModel}/>
						<Route page_info={models.routes.features} path={`${models.path}/:modelId`} exact component={Features}/>
						<Route page_info={models.routes.feature_details} path={`${models.path}/:modelId/:featureId`} exact component={FeatureDetails}/>
            <Route page_info={page404} path={page404.path} component={Page404}/>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;