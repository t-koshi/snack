import {
  SIGNUP_USER,
  SIGNIN_USER
} from '../actions/session_actions';

const fetchingReducer = (state = false, action) => {
  Object.freeze();

  switch(action.type){
    case SIGNUP_USER:
    case SIGNIN_USER:
      return true;
    default:
      return state;
  }
};

export default fetchingReducer;
