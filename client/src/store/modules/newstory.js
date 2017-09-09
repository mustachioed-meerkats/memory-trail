import axios from 'axios';


/** ============================================================
 * Define Actions
 * =============================================================
 */

export const SET_NEW_STORY_TITLE = 'newstory/SET_NEW_STORY_TITLE';
export const SET_NEW_STORY_SUMMARY = 'newstory/SET_NEW_STORY_SUMMARY';

/** ============================================================
 * Define Initial State
 * =============================================================
 */

const initialState = {
  storyTitle: '',
  storySummary: '',
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_NEW_STORY_TITLE :
    return ({
      ...state,
      storyTitle: action.title,
      storySummary: state.storySummary,
    });

  case SET_NEW_STORY_SUMMARY : 
    return ({
      ...state,
      storyTitle: state.storyTitle,
      storySummary: action.summary,
    });

  default:
    return state;
  }
};



/** ============================================================
 * Action Creators
 * =============================================================
 */


export const handleStoryTitle = (title) => {
  return {
    type: SET_NEW_STORY_TITLE,
    title
  };
};

export const handleStorySummary = (summary) => {
  return {
    type: SET_NEW_STORY_SUMMARY,
    summary
  };
};