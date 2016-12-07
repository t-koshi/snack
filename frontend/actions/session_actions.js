import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RESET_ERRORS = "RESET_ERRORS";


export function receiveCurrentUser(currentUser){
  return { type: RECEIVE_CURRENT_USER, currentUser };
}

export function receiveErrors(errors){
  return { type: RECEIVE_ERRORS, errors };
}

export function resetErrors(){
  return { type: RESET_ERRORS };
}

// THUNKS

export function login(user){
  return ((dispatch) => {
    return APIUtil.login(
      user,
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  });
}

export function signup(user){
  return ((dispatch) =>{
    return APIUtil.signup(
      user,
      (currentUser) => dispatch(receiveCurrentUser(currentUser)),
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  });
}

export function logout(){
  return((dispatch) => {
    return APIUtil.logout(
      () => dispatch(receiveCurrentUser(null)),
      () => dispatch(receiveErrors(errors.responseJSON))
    );
  });
}
