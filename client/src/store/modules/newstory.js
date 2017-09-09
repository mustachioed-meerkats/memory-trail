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
      storySummary: state.summary,
    });

  case SET_NEW_STORY_SUMMARY : 
    return ({
      ...state,
      storyTitle: state.title,
      storySummary: action.content,
    });
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

export const handleStorySummary = (content) => {
  return {
    type: SET_NEW_STORY_SUMMARY,
    summary
  };
};
