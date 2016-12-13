import { merge } from 'lodash';

import {
  RECEIVE_CHANNEL,
  RECEIVE_CHANNELS,
  RECEIVE_ERRORS,
  RESET_ERRORS
} from '../actions/channel_actions';

const _default = {
  channels: {},
  errors: null
};

const channelsReducer = (state = _default, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_CHANNEL:
      _.merge(newState.channels, { [action.channel.id]: action.channel });
      return newState;
    case RECEIVE_CHANNELS:
      newState.channels = action.channels;
      newState.errors = null;
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    case RESET_ERRORS:
      newState.errors = null;
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
