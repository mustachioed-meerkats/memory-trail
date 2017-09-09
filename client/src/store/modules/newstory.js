import axios from 'axios';


/** ============================================================
 * Define Actions
 * =============================================================
 */

<<<<<<< HEAD
export const SET_NEW_STORY_TITLE = 'newstory/SET_NEW_STORY_TITLE';
export const SET_NEW_STORY_SUMMARY = 'newstory/SET_NEW_STORY_SUMMARY';
=======

>>>>>>> Added more redux stuff.

/** ============================================================
 * Define Initial State
 * =============================================================
 */

const initialState = {
<<<<<<< HEAD
  storyTitle: '',
  storySummary: '',
=======
  title: '',
  summary: '',
>>>>>>> Added more redux stuff.
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
<<<<<<< HEAD
  case SET_NEW_STORY_TITLE :
    return ({
      ...state,
      storyTitle: action.title,
      storySummary: state.storySummary,
=======
  case SET_NEW_STORY_TITLE : 
    return ({
      ...state,
      title: action.title,
      summary: state.summary,
>>>>>>> Added more redux stuff.
    });

  case SET_NEW_STORY_SUMMARY : 
    return ({
      ...state,
<<<<<<< HEAD
      storyTitle: state.storyTitle,
      storySummary: action.summary,
    });

  default:
    return state;
=======
      title: state.title,
      summary: action.content,
    });


>>>>>>> Added more redux stuff.
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

<<<<<<< HEAD
export const handleStorySummary = (summary) => {
=======
export const handleStorySummary = (content) => {
>>>>>>> Added more redux stuff.
  return {
    type: SET_NEW_STORY_SUMMARY,
    summary
  };
};
