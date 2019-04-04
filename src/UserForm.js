import React, { Component } from 'react';
import { connect } from 'react-redux';
import createUserInDatabase from './store';

class UserForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      name: document.querySelector('#name').value,
      bio: document.querySelector('#bio').value,
      rank: +document.querySelector('#rank').value,
    };
    console.log(user);
    console.log(this.props);
    this.props.createUser(user);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <input
          id="name"
          name="name"
          className="form-control"
          onChange={this.handleChange}
          type="text"
        />
        <br />

        <label>Bio:</label>
        <input
          id="bio"
          name="bio"
          className="form-control"
          onChange={this.handleChange}
          type="decimal"
        />
        <br />

        <label>Rank:</label>
        <input
          id="rank"
          name="rank"
          className="form-control"
          onChange={this.handleChange}
          type="number"
        />

        <br />
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(createUserInDatabase(user)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserForm);
