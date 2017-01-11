import * as APIUtil from '../util/user_api_util';
import { RECEIVE_CURRENT_USER } from './session_actions';

export const FETCH_USERS = "FETCH_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const EDIT_PROFILE = "EDIT_PROFILE";

export function receiveUsers(users){
  return { type: RECEIVE_USERS, users };
}

// THUNK

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USERS });
    return APIUtil.fetchUsers().then(
      users => dispatch(receiveUsers(users))
    );
  };
};

export const editProfile = (formData) => {
  return (dispatch) => {
    dispatch({ type: EDIT_PROFILE });
    return APIUtil.editProfile(formData).then(
      currentUser => {
        return dispatch({ type: RECEIVE_CURRENT_USER, currentUser});
    });
  };
};
