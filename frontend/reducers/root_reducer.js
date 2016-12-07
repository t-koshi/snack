import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import channelsReducer from './channels_reducer';


const rootReducer = combineReducers({
  session: SessionReducer,
  channels: channelsReducer
});

export default rootReducer;
