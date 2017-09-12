import axios from 'axios';

/** ============================================================
 * Define Actions
 * ========================================================== */
export const SET_CURRENT_USER_POSTS = 'SET_CURRENT_USER_POSTS';

/** ============================================================
 * Define Initial State
 * ========================================================== */
const initialState = {
  posts: __PRELOADED_STATE__.posts,
  currentUserPosts: []
};

/** ============================================================
 * Define Reducers
 * ========================================================== */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENT_USER_POSTS:
    return {
      currentUserPosts: action.currentUserPosts
    };
  default:
    return state;
  }
};


export const handleTitleInput = (title) => {
  return {
    type: SET_NEW_POST_TITLE_INPUT,
    title
  };
};

export const handleContentTextArea = (content) => {
  return {
    type: SET_NEW_POST_CONTENT_TEXTAREA,
    content
  };
};

export const handleLocationInput = (location) => {
  return {
    type: SET_NEW_POST_LOCATION_INPUT,
    location
  };
};

export const getPostsByUserId = (userId) => {
  return dispatch => {
    return axios.get(`/api/posts/user/${userId}`)
      .then(results => {
        dispatch({
          type: SET_CURRENT_USER_POSTS,
          currentUserPosts: results.data,
        });
      });
  };
};