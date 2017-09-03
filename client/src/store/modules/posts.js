import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_NEW_POST_TITLE_INPUT = 'posts/SET_NEW_POST_TITLE_INPUT';
export const SET_NEW_POST_CONTENT_TEXTAREA = 'posts/SET_NEW_POST_CONTENT_TEXTAREA';
export const SET_NEW_POST_LOCATION_INPUT = 'posts/SET_NEW_POST_LOCATION_INPUT';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  posts: [
    {
      title: 'First Post',
      content: 'This is first post content'
    },
    {
      title: 'Second Post',
      content: 'This is second post content'
    },
  ],
  newPost: {
    title: '',
    content: '',
    location: ''

  }
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_NEW_POST_TITLE_INPUT : 
    return {
      ...state,
      newPost: {
        title: action.title,
        content: state.newPost.content,
        location: state.newPost.location
      }
    };
  case SET_NEW_POST_CONTENT_TEXTAREA : 
    return ({
      ...state,
      newPost: {
        title: state.newPost.title,
        content: action.content,
        location: state.newPost.location
      }
    });
  case SET_NEW_POST_LOCATION_INPUT : 
    return ({
      ...state,
      newPost: {
        title: state.newPost.title,
        content: state.newPost.content,
        location: action.location
      }
    });
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