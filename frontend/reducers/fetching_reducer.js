import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  RESET_ERRORS,
  SIGNUP_USER,
  SIGNIN_USER
} from '../actions/session_actions';

const fetchingReducer = (state = false, action) => {
  Object.freeze();

  switch(action.type){
    case SIGNUP_USER:
    case SIGNIN_USER:
      return true;
    case RECEIVE_CURRENT_USER:
    case RECEIVE_ERRORS:
    case RESET_ERRORS:
      return false;
    default:
      return state;
  }
};

export default fetchingReducer;
