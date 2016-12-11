import * as APIUtil from '../util/user_api_util';

export const FETCH_USERS = "FETCH_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";

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
