import axios from 'axios';

/** ============================================================
 * Define Actions Types
 * =============================================================
 */
export const GET_USER_STORIES = 'GET_USER_STORIES';
export const GET_USER_INFO = 'GET_USER_INFO';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  user: '',
  stories: [],
  posts: [],
  following: []
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case GET_USER_STORIES:
    return {
      stories: action.payload
    };
  case GET_USER_INFO:
    return {
      user: action.payload
    };
  default:
    return state;
  }
};

/** ============================================================
 * Define Action Creator
 * =============================================================
 */

export const getUserStories = (userId) => {
  console.log('getting stories');
  return dispatch => {
    return axios.get(`/api/stories/user/${userId}`)
      .then(results => {
        dispatch({
          type: GET_USER_STORIES,
          payload: results.data
        });
      });
  };
};

export const getUserInfo = (userId) => {
  console.log('getting info');
  return dispatch => {
    return axios.get(`/api/profiles/${userId}`)
      .then(results => {
        dispatch({
          type: GET_USER_INFO,
          payload: results.data
        });
      });
  };
};




/** ============================================================
 * Define Helper Functions
 * =============================================================
 */
export const getPostsFromStories = (stories) => {
  var posts = [];
  stories.forEach(story => {
    posts = posts.concat(story.posts);
  });
  return posts;
};