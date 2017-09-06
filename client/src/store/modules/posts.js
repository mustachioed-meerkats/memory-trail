import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  posts: __PRELOADED_STATE__.posts,
  userPosts: __PRELOADED_STATE__.userPosts
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

/** ============================================================
 * Action Creators
 * =============================================================
 */

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