import { merge } from 'lodash';

import {
  RECEIVE_USERS
} from '../actions/user_actions';

const _default = {
};

const usersReducer = (state = _default, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type){
    case RECEIVE_USERS:
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;
