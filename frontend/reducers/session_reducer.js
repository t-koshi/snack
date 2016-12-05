import { merge } from 'lodash';

import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS
} from '../actions/session_actions';

const _default = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = _default, action) => {
  Object.freeze();
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      newState.currentUser = action.currentUser;
      newState.errors = [];
      return newState;
    case RECEIVE_ERRORS:
      newState.currentUser = null;
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
