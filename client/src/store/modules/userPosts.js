import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_USER_POSTS = 'SET_USER_POSTS';

/** ============================================================
 * Define Initial State --  THIS IS NOT NEEDED IF SETTING INITIAL STATE
 * =============================================================
 */
const initialState = {
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_USER_POSTS:
    return {
      posts: action.posts
    };
  default:
    return state;
  }
};

/** ============================================================
 * Define 
 * =============================================================
 */

export const getPostsByUserId = (userId) => {
  return dispatch => {
    return axios.get(`/api/posts/user/${userId}`)
      .then(results => {
        dispatch({
          type: SET_USER_POSTS,
          posts: results.data,
        });
      });
  };
};