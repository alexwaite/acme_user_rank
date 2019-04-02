import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const GOT_USERS = 'GOT_USERS';
const DELETE_USER = 'DELETE_USER';

const gotUsers = users => {
  return {
    type: GOT_USERS,
    users,
  };
};

const fetchUsers = () => {
  return async dispatch => {
    const response = await axios.get('/api/users');
    const users = response.data;
    dispatch(gotUsers(users));
  };
};

const deleteUser = id => {
  return async dispatch => {
    await axios.delete(`/api/users/${id}`);
  };
};

const initialState = { users: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { fetchUsers };
