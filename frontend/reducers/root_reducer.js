import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import channelsReducer from './channels_reducer';
import fetchingReducer from './fetching_reducer';
import usersReducer from './users_reducer';
import currentChannelReducer from './current_channel_reducer';
import messagesReducer from './messages_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  channels: channelsReducer,
  fetching: fetchingReducer,
  users: usersReducer,
  currentChannel: currentChannelReducer,
  messages: messagesReducer
});

export default rootReducer;
