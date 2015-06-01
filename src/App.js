import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;
import Menu from './components/Menu';
import Posts from './components/Posts';
import Post from './components/Post';

const App = React.createClass({
  render () {
    return (
      <div>
	<h1><Link to="/">My Sweet Blog</Link></h1>
	<Menu location="primary" />
	<RouteHandler />
      </div>
    );
  }
});

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={Posts} />
    <Route name="post" handler={Post} path="/:type/:slug" />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.body);
});
