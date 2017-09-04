import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_NEW_POST_TITLE_INPUT = 'newpost/SET_NEW_POST_TITLE_INPUT';
export const SET_NEW_POST_CONTENT_TEXTAREA = 'newpost/SET_NEW_POST_CONTENT_TEXTAREA';
export const SET_NEW_POST_LOCATION_INPUT = 'newpost/SET_NEW_POST_LOCATION_INPUT';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  title: '',
  content: '',
  location: '',
  profile_id: __PRELOADED_STATE__.user.id
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
      title: action.title,
      content: state.content,
      location: state.location
    };
  case SET_NEW_POST_CONTENT_TEXTAREA : 
    return ({
      ...state,
      title: state.title,
      content: action.content,
      location: state.location
    });
  case SET_NEW_POST_LOCATION_INPUT : 
    return ({
      ...state,
      title: state.title,
      content: state.content,
      location: action.location
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