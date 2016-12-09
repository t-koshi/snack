import {
  RECEIVE_CHANNEL,
  RECEIVE_CHANNELS,
  RECEIVE_ERRORS,
  RESET_ERRORS,
  FETCH_CHANNELS,
  CREATE_CHANNEL
} from '../actions/channel_actions';

const fetchingReducer = (state = false, action) => {
  Object.freeze();

  switch(action.type){
    case FETCH_CHANNELS:
    case CREATE_CHANNEL:
      return true;
    case RECEIVE_CHANNEL:
    case RECEIVE_CHANNELS:
    case RECEIVE_ERRORS:
    case RESET_ERRORS:
      return false;
    default:
      return state;
  }
};

export default fetchingReducer;
