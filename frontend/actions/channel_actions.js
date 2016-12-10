import * as APIUtil from '../util/channel_api_util';

export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RESET_ERRORS = "RESET_ERRORS";
export const FETCH_CHANNELS = "FETCH_CHANNELS";
export const CREATE_CHANNEL = "CREATE_CHANNEL";

export function receiveChannel(channel){
  return { type: RECEIVE_CHANNEL, channel };
}

export function receiveChannels(channels){
  return { type: RECEIVE_CHANNELS, channels };
}

export function receiveErrors(errors){
  return { type: RECEIVE_ERRORS, errors };
}

export function resetErrors(){
  return { type: RESET_ERRORS };
}

// THUNK

export const fetchChannels = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_CHANNELS });
    return APIUtil.fetchChannels().then(
      channels => dispatch(receiveChannels(channels)),
      error => dispatch(receiveErrors(error))
    );
  };
};

export const joinChannel = (channel) => {
  return (dispatch) => {
    dispatch({ type: JOIN_CHANNEL });
    return APIUtil.joinChannel(channel).then(
      channels => dispatch(receiveChannels(channels)),
      error => dispatch(receiveErrors(error))
    );
  };
};


export const createChannel = (channel) => {
  return (dispatch) => {
    dispatch({ type: CREATE_CHANNEL });
    return APIUtil.createChannel(channel).then(
      channel => dispatch(receiveChannel(channel)),
      error => dispatch(receiveErrors(error))
    );
  };
};
