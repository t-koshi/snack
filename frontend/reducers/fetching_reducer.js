import {
  RECEIVE_CHANNEL,
  RECEIVE_CHANNELS,
  RECEIVE_ERRORS,
  RESET_ERRORS,
  FETCH_CHANNELS,
  CREATE_CHANNEL,
  JOIN_CHANNEL
} from '../actions/channel_actions';

import {
  FETCH_USERS,
  EDIT_PROFILE,
  RECEIVE_USERS
} from '../actions/user_actions';

import {
  FETCH_CURRENT_CHANNEL,
  GOTO_CHANNEL,
  FETCH_MESSAGES,
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  CREATE_MESSAGES
} from '../actions/messages_actions';

import {
  SIGNUP_USER,
  SIGNIN_USER,
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';

const fetchingReducer = (state = false, action) => {
  Object.freeze(state);

  switch(action.type){
    case FETCH_CHANNELS:
    case FETCH_USERS:
    case CREATE_CHANNEL:
    case FETCH_CURRENT_CHANNEL:
    case FETCH_MESSAGES:
    case JOIN_CHANNEL:
    case CREATE_MESSAGES:
    case SIGNUP_USER:
    case SIGNIN_USER:
    case FETCH_USERS:
    case EDIT_PROFILE:
      return true;
    case RECEIVE_CHANNEL:
    case RECEIVE_CHANNELS:
    case RECEIVE_ERRORS:
    case RESET_ERRORS:
    case GOTO_CHANNEL:
    case RECEIVE_MESSAGES:
    case RECEIVE_MESSAGE:
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USERS:
      return false;
    default:
      return state;
  }
};

export default fetchingReducer;
