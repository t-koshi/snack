import * as ChannelAPIUtil from '../util/channel_api_util';
import * as MessageAPIUtil from '../util/message_api_util';

export const GOTO_CHANNEL = "GOTO_CHANNEL";
export const FETCH_CURRENT_CHANNEL = "FETCH_CURRENT_CHANNEL";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RESET_ERRORS = "RESET_ERRORS";
export const CREATE_MESSAGES = "CREATE_MESSAGES";


export function gotoChannel(channel){
  return { type: GOTO_CHANNEL, channel };
}

export function receiveMessages(messages){
  return { type: RECEIVE_MESSAGES, messages };
}

export function receiveErrors(errors){
  return { type: RECEIVE_ERRORS, errors };
}

export function resetErrors(){
  return { type: RESET_ERRORS };
}

// THUNK

export const fetchCurrentChannel = (channelName) => {
  return (dispatch) => {
    dispatch({ type: FETCH_CURRENT_CHANNEL });
    return ChannelAPIUtil.fetchCurrentChannel(channelName).then(
      currentChannel => dispatch(gotoChannel(currentChannel)),
      error => console.log(error.responseText)
    );
  };
};

export const fetchMessages = (channelName) => {
  return (dispatch) => {
    dispatch({ type: FETCH_MESSAGES });
    return MessageAPIUtil.fetchMessages(channelName).then(
      messages => dispatch(receiveMessages(messages)),
      error => console.log(error.responseText)
    );
  };
};

export const sendMessage = (message, channel) => {
  return (dispatch) => {
    dispatch({ type: CREATE_MESSAGES });
    return MessageAPIUtil.sendMessage(message, channel).then(
      messages => dispatch(receiveMessages(messages)),
      error => console.log(error.responseText)
    );
  };
};
