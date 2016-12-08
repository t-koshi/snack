import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import channelsReducer from './channels_reducer';
import fetchingReducer from './fetching_reducer';


const rootReducer = combineReducers({
  session: SessionReducer,
  channel: channelsReducer,
  fetching: fetchingReducer
});

export default rootReducer;
