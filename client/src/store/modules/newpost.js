import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_NEW_POST_TITLE_INPUT = 'newpost/SET_NEW_POST_TITLE_INPUT';
export const SET_NEW_POST_CONTENT_TEXTAREA = 'newpost/SET_NEW_POST_CONTENT_TEXTAREA';
export const SET_NEW_POST_LOCATION_INPUT = 'newpost/SET_NEW_POST_LOCATION_INPUT';
export const HANDLE_STORY_LOAD = 'newpost/HANDLE_STORY_LOAD';
/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  title: '',
  content: '',
  location: '',
  story: '',
  landmark: '',
  profile_id: __PRELOADED_STATE__.user.id,
  allUserStories: [{Test: 'Data'}]
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
  case HANDLE_STORY_LOAD :
    return ({
      ...state,
      allUserStories: action.allUserStories,
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

export const handleStoryLoad = () => {
  return dispatch => {
    return loadStoriesByUser(initialState.profile_id)
      .then(results => {
        console.log('LOADING STORIES FROM SERVER', results);
        dispatch({
          type: HANDLE_STORY_LOAD,
          allUserStories: results.data,
        });
      });
  };
};

/**
 * ==========================================================
 * API Calls
 * ==========================================================
 */


export const loadStoriesByUser = (profile_id) => {
  return axios.get(`/api/stories/user/${profile_id}`);
};