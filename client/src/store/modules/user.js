import axios from 'axios';

/** ============================================================
 * Define Actions
 * ========================================================== */
export const SET_CURRENT_USER_FOLLOWINGS = 'SET_CURRENT_USER_FOLLOWINGS';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  user: __PRELOADED_STATE__.user.user,
  stories: __PRELOADED_STATE__.user.stories,
  posts: __PRELOADED_STATE__.user.posts,
  following: __PRELOADED_STATE__.user.following,
  passport: __PRELOADED_STATE__.user.passport,
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENT_USER_FOLLOWINGS:
    return {
      ...state,
      following: action.followings
    };
  default:
    return state;
  }
};


/** ============================================================
 * Define Action Creators
 * ========================================================== */

export const getCurrentUserFollowings = (profile_id) => {
  return dispatch => {
    return axios.get(`/api/followings/${profile_id}`)
      .then(results => {
        dispatch({
          type: SET_CURRENT_USER_FOLLOWINGS,
          followings: results.data,
        });
      });
  };
};