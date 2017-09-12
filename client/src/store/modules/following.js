import axios from 'axios';

/** ============================================================
 * Define Actions
 * ========================================================== */
export const FOLLOW_NEW_USER = 'FOLLOW_NEW_USER';
export const SET_POSTS_FOLLOW_FEED = 'SET_POSTS_FOLLOW_FEED';
export const SET_USER_FOLLOWINGS = 'SET_USER_FOLLOWINGS';

/** ============================================================
 * Define Initial State --  THIS IS NOT NEEDED IF SETTING INITIAL STATE
 * ========================================================== */
const initialState = {
};

/** ============================================================
 * Define Reducers
 * ========================================================== */
export default (state = initialState, action) => {
  switch (action.type) {
  case FOLLOW_NEW_USER:
    return {
      state
    };
  case SET_POSTS_FOLLOW_FEED:
    return {
      ...state,
      posts: action.posts
    };
  case SET_USER_FOLLOWINGS:
    return {
      ...state,
      followings: action.followings
    };
  default:
    return state;
  }
};

/** ============================================================
 * Define Action Creators
 * ========================================================== */

export const followNewUser = (profile_id, following_id) => {
  return dispatch => {
    return axios.post('/api/followings/new', {profile_id, following_id})
      .then(results => {
        dispatch({
          type: FOLLOW_NEW_USER
        });
      });
  };
};

export const getPostsByFollowings = (profile_id) => {
  return dispatch => {
    return axios.get(`/api/posts/followings/${profile_id}`)
      .then(results => {
        dispatch({
          type: SET_POSTS_FOLLOW_FEED,
          posts: results.data,
        });
      });
  };
};

export const getAllFollowings = (profile_id) => {
  return dispatch => {
    return axios.get(`/api/followings/${profile_id}`)
      .then(results => {
        dispatch({
          type: SET_USER_FOLLOWINGS,
          followings: results.data,
        });
      });
  };
};