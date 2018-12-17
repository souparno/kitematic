import React from 'react/addons';
import Containers from './components/Containers.react';
import About from './components/About.react';
import NewContainerSearch from './components/NewContainerSearch.react';
import Router from 'react-router';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="account" path="account">
      <Route name="signup" path="signup"/>
      <Route name="login" path="login"/>
    </Route>
    <Route name="containers" path="containers" handlers={Containers}>
      <Route name="container" path="details/:name">
        <DefaultRoute name="containerHome"/>
        <Route name="containerSettings" path="settings">
          <Route name="containerSettingsGeneral" path="general"/>
          <Route name="containerSettingsPorts" path="ports"/>
          <Route name="containerSettingsVolumes" path="volumes"/>
          <Route name="containerSettingsNetwork" path="network"/>
          <Route name="containerSettingsAdvanced" path="advanced"/>
        </Route>
      </Route>
      <Route name="search" handler={NewContainerSearch}/>
      <Route name="preferences" path="preferences"/>
      <Route name="about" path="about" handler={About}/>
    </Route>
    <DefaultRoute name="loading"/>
    <Route name="setup"/>
  </Route>
);

module.exports = routes;