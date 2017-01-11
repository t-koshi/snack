import { merge } from 'lodash';

import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE
} from '../actions/messages_actions';

import {
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';

const _default = {
};

const messagesReducer = (state = _default, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);
  switch(action.type){
    case RECEIVE_MESSAGES:
      return action.messages;
    case RECEIVE_MESSAGE:
      newState = _.merge(newState, {[action.message.id]: action.message});
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
