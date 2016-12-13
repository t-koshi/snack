import { merge } from 'lodash';

import {
  GOTO_CHANNEL,
  RECEIVE_ERRORS,
  RESET_ERRORS
} from '../actions/messages_actions';

const _default = {
  currentChannel: {},
  errors: null
};

const currentChannelReducer = (state = _default, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case GOTO_CHANNEL:
      newState.currentChannel = action.channel;
      newState.errors = null;
      return newState;
    default:
      return state;
  }
};

export default currentChannelReducer;
