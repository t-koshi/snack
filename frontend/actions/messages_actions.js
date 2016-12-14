import * as ChannelAPIUtil from '../util/channel_api_util';
// import * as MessageAPIUtil from '../util/message_api_util';

export const GOTO_CHANNEL = "GOTO_CHANNEL";
export const FETCH_CURRENT_CHANNEL = "FETCH_CURRENT_CHANNEL";
// export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RESET_ERRORS = "RESET_ERRORS";

export function gotoChannel(channel){
  return { type: GOTO_CHANNEL, channel };
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

//
// export const fetchChannels = () => {
//   return (dispatch) => {
//     dispatch({ type: FETCH_CHANNELS });
//     return APIUtil.fetchChannels().then(
//       channels => dispatch(receiveChannels(channels)),
//       error => dispatch(receiveErrors(error))
//     );
//   };
// };
//
// export const fetchUsers = () => {
//   return (dispatch) => {
//     dispatch({ type: FETCH_USERS });
//     return APIUtil.fetchUsers().then(
//       channels => dispatch(receiveUsers(users)),
//       error => dispatch(receiveErrors(error))
//     );
//   };
// };
//
// export const joinChannel = (channel) => {
//   return (dispatch) => {
//     dispatch({ type: JOIN_CHANNEL });
//     return APIUtil.joinChannel(channel).then(
//       channels => dispatch(receiveChannels(channels)),
//       error => dispatch(receiveErrors(error))
//     );
//   };
// };
//
// export const createChannel = (channel) => {
//   return (dispatch) => {
//     dispatch({ type: CREATE_CHANNEL });
//     return APIUtil.createChannel(channel).then(
//       channel => dispatch(receiveChannel(channel)),
//       error => dispatch(receiveErrors(error))
//     );
//   };
// };
