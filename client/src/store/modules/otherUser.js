import axios from 'axios';

/** ============================================================
 * Define Actions Types
 * =============================================================
 */
export const GET_USER_STORIES = 'GET_USER_STORIES';
export const GET_USER_INFO = 'GET_USER_INFO';
export const IS_CURRENT_USER_FOLLOWING = 'IS_CURRENT_USER_FOLLOWING';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  user: {},
  stories: [],
  posts: [],
  following: [],
  isCurrentUserFollowing: false
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state,
      user: action.user,
      stories: action.stories,
      posts: action.posts
    };
  // case IS_CURRENT_USER_FOLLOWING:
  //   return {
  //     isCurrentUserFollowing: action.payload
  //   };
  default:
    return state;
  }
};

/** ============================================================
 * Define Action Creator
 * =============================================================
 */

export const getUserInfo = (userId) => {
  return dispatch => {
    return axios.get(`/api/profiles/info/${userId}`)
      .then(results => {
        var posts = getPostsFromStories(results.data[1]);
        dispatch({
          type: GET_USER_INFO,
          user: results.data[0],
          stories: results.data[1],
          posts: posts
        });
      });
  };
};

// export const determineFollowingStatus = (userId, currentUserFollowings) => {
//   var isCurrentUserFollowing = currentUserFollowings.some(following => {
//     return userId === following.following_id;
//   });
//   // debugger
//   return dispatch => {
//     dispatch({
//       type: IS_CURRENT_USER_FOLLOWING,
//       payload: isCurrentUserFollowing
//     });
//   };
// };


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