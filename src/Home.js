import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './store';

class Home extends Component {
  componentDidMount() {
    return this.props.fetchInitialUsers();
  }

  render() {
    const users = this.props.users;
    return <p>We have {users.length} users!</p>;
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
)(Home);
