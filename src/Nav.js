import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {
  render() {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" activeclassname="selected" exact to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeclassname="selected"
            exact
            to="/users"
          >
            Users ({this.props.users.length})
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeclassname="selected"
            exact
            to="/users/create"
          >
            Create A User
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

export default connect(mapStateToProps)(Nav);
