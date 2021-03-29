const routes = {
	home: {
		path: '/',
		title: 'Home'
	},
	models: {
		path: '/models',
		title: 'Models',
		routes: {
			select_model: {
				title: 'Select model',
			},
			features: {
				title: 'Models features',
			},
			feature_details: {
				title: 'Feature details'
			},
		}
	},
	page404: {
		path: '*',
		title: 'Page not found'
	}
};

export default routes;