import axios from 'axios';
import { routerMiddleware, push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import {createStore} from 'redux';
import thunk from 'redux-thunk';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_NEW_POST_TITLE_INPUT = 'newpost/SET_NEW_POST_TITLE_INPUT';
export const SET_NEW_POST_CONTENT_TEXTAREA = 'newpost/SET_NEW_POST_CONTENT_TEXTAREA';
export const SET_NEW_POST_LOCATION_INPUT = 'newpost/SET_NEW_POST_LOCATION_INPUT';
export const SET_NEW_POST_IMAGEURL = 'newpost/SET_NEW_POST_IMAGEURL';
export const HANDLE_STORY_LOAD = 'newpost/HANDLE_STORY_LOAD';
export const HANDLE_NEW_POST = 'newpost/HANDLE_NEW_POST';
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
  profile_id: __PRELOADED_STATE__.currentUser.id,
  allUserStories: [{Test: 'Data'}],
  image_url: '',
};

//The middleware below allows us to redirect from the redux store. 
const middleware = routerMiddleware(browserHistory);


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
      location: state.location,
      image_url: state.image_url
    };
  case SET_NEW_POST_CONTENT_TEXTAREA : 
    return ({
      ...state,
      title: state.title,
      content: action.content,
      location: state.location,
      image_url: state.image_url
    });
  case SET_NEW_POST_LOCATION_INPUT : 
    return ({
      ...state,
      title: state.title,
      content: state.content,
      location: action.location,
      image_url: state.image_url
    });
  
  case SET_NEW_POST_IMAGEURL :
    return ({
      ...state,
      title: state.title,
      content: state.content,
      location: state.location,
      image_url: action.image_url
    });
  case HANDLE_NEW_POST : 
    return ({
      ...state,
    });
  case HANDLE_STORY_LOAD :
    return ({
      ...state,
      allUserStories: action.allUserStories,
    });
    applyMiddleware(middleware);
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
        dispatch({
          type: HANDLE_STORY_LOAD,
          allUserStories: results.data,
        });
      });
  };
};


export const handleNewPost = (postObject) => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_NEW_POST,
    });
    createNewPost(postObject)
    .then(() => {
      dispatch(push('/profile'));
      console.log('(Client) Success! CREATING NEW POST');
    })
      .catch((err) => {
        console.log('(Client) Error! CREATING NEW POST');
        console.log(err);
      });
  };
};

export const handleImageUrl = (image_url) => {
  return {
    type: SET_NEW_POST_IMAGEURL,
    image_url
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

export const createNewPost = (postObject) => {
  return axios.post('/api/posts/new', postObject);
};