import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const GOT_USERS = 'GOT_USERS';
const DELETE_USER = 'DELETE_USER';
const CREATE_USER = 'CREATE_USER';

const gotUsers = users => {
  return {
    type: GOT_USERS,
    users,
  };
};

const deletedUserFromState = id => {
  return {
    type: DELETE_USER,
    id,
  };
};

const createUserOnState = user => {
  return {
    type: CREATE_USER,
    user,
  };
};

export const fetchUsers = () => {
  return async dispatch => {
    const response = await axios.get('/api/users');
    const users = response.data;
    dispatch(gotUsers(users));
  };
};

export const deleteUserFromDatabase = id => {
  return dispatch => {
    axios
      .delete(`/api/users/${id}`)
      .then(() => dispatch(deletedUserFromState(id)))
      .catch(err => console.error(err));
  };
};

export const createUserInDatabase = user => {
  return async dispatch => {
    await axios
      .post('/api/users', user)
      .then(response => dispatch(createUserOnState(response.data)))
      .catch(err => console.error(err));
  };
};

const initialState = { users: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS:
      return { ...state, users: action.users };
    case DELETE_USER:
      return {
        users: [...state.users].filter(user => user.id !== action.id),
      };
    case CREATE_USER:
      return {
        users: [...state.users, action.user],
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
