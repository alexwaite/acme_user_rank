import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { fetchUsers } from './store';

class Users extends Component {
  componentDidMount() {
    return this.props.fetchInitialUsers();
  }

  render() {
    const users = this.props.users;
    return (
      <div>
        <ul className="list-group">
          {users.map(user => (
            <li key={user.id} className="list-group-item">
              <span>{user.name}</span>
              <br />
              <span>{user.bio}</span>
              <br />
              <span className="badge badge-success">Ranked {user.rank}</span>
              <br />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
