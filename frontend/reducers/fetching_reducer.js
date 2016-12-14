import {
  RECEIVE_CHANNEL,
  RECEIVE_CHANNELS,
  RECEIVE_ERRORS,
  RESET_ERRORS,
  FETCH_CHANNELS,
  CREATE_CHANNEL
} from '../actions/channel_actions';

import {
  FETCH_USERS
} from '../actions/user_actions';

import {
  FETCH_CURRENT_CHANNEL,
  GOTO_CHANNEL
} from '../actions/messages_actions';

const fetchingReducer = (state = false, action) => {
  Object.freeze(state);

  switch(action.type){
    case FETCH_CHANNELS:
    case FETCH_USERS:
    case CREATE_CHANNEL:
    case FETCH_CURRENT_CHANNEL:
      return true;
    case RECEIVE_CHANNEL:
    case RECEIVE_CHANNELS:
    case RECEIVE_ERRORS:
    case RESET_ERRORS:
    case GOTO_CHANNEL:
      return false;
    default:
      return state;
  }
};

export default fetchingReducer;
