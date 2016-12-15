import { merge } from 'lodash';

import {
  RECEIVE_MESSAGES
} from '../actions/messages_actions';

const _default = {
};

const messagesReducer = (state = _default, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_MESSAGES:
      return action.messages;
    default:
      return state;
  }
};

export default messagesReducer;
