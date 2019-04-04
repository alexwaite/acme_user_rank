import React, { Component } from 'react';
import Nav from './Nav';
import { HashRouter, Route } from 'react-router-dom';
import Users from './Users';
import Home from './Home';
import UserForm from './UserForm';

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Acme Users With Ranks</h1>
          <Nav />
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/create" render={() => <UserForm />} />
        </div>
      </HashRouter>
    );
  }
}
