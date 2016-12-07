import { merge } from 'lodash';

import {
  RECEIVE_CHANNEL,
  RECEIVE_CHANNELS,
  RECEIVE_ERRORS,
  RESET_ERRORS
} from '../actions/channel_actions';


const channelsReducer = (state = {}, action) => {
  Object.freeze();
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_CHANNEL:
      const newChannel = { [action.channel.id]: action.channel };
      return  merge(newState, newChannel);
    case RECEIVE_CHANNELS:
      return  merge(newState, action.channels);
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
