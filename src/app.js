import 'babel-polyfill';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import routerContainer from './router';

var router = Router.create({
  routes: routes
});
router.run(Handler => React.render(<Handler/>, document.body));
routerContainer.set(router);
router.transitionTo('search');
