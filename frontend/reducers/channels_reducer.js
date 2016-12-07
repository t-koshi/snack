import { merge } from 'lodash';

import {
  RECEIVE_CHANNEL
} from '../actions/channel_actions';

const channelsReducer = (state, action) => {
  Object.freeze();
  let newState = merge({}, state);
  switch(action.type){
    
    default:
      return state;
  }
};

export default channelsReducer;
