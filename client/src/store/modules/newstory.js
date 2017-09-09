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
  title: '',
  summary: '',
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
      title: action.title,
      summary: state.summary,
    });

  case SET_NEW_STORY_SUMMARY : 
    return ({
      ...state,
      title: state.title,
      summary: action.content,
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
