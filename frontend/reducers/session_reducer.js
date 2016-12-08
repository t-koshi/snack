import { merge } from 'lodash';

import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  RESET_ERRORS,
  SIGNUP_USER,
  SIGNIN_USER
} from '../actions/session_actions';

const _default = {
  currentUser: null,
  errors: null
};

const SessionReducer = (state = _default, action) => {
  Object.freeze();
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      newState.currentUser = action.currentUser;
      newState.errors = null;
      return newState;
    case RECEIVE_ERRORS:
      newState.currentUser = null;
      newState.errors = action.errors;
      return newState;
    case RESET_ERRORS:
      newState.errors = null;
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
