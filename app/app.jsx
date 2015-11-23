'use strict';

import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/main.scss';
import 'font-awesome-webpack';
import React from 'react';
import Router from 'react-router';
import {Routes} from './constants/Routes';
import Index from './pages/Index/Index';

import {
  DefaultRoute,
  Route,
  RouteHandler
}
from 'react-router';


export default class App extends React.Component {

  render() {
    return (<div>
            <RouteHandler/>
            </div>);
  }
}

let routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name={Routes.INDEX} handler={Index}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
