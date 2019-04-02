import React, { Component } from 'react';
import Nav from './Nav';
import { HashRouter, Route } from 'react-router-dom';
import Users from './Users';
import Home from './Home';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  loadData = () => {
    return axios
      .get('/api/users')
      .then(response => this.setState({ users: response.data }));
  };

  render() {
    return (
      <HashRouter>
        <div>
          <h1>Acme Users With Ranks</h1>
          <Nav />
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/users" render={() => <Users />} />
        </div>
      </HashRouter>
    );
  }
}
