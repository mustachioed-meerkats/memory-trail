import axios from 'axios';
import { routerMiddleware, push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import {createStore} from 'redux';
import thunk from 'redux-thunk';

/** ============================================================
 * Define Actions
 * ========================================================== */
export const SET_CURRENT_USER_FOLLOWINGS = 'SET_CURRENT_USER_FOLLOWINGS';
export const UPDATE_AFTER_SUBMIT = 'UPDATE_AFTER_SUBMIT';
export const UPDATE_PASSPORT = 'UPDATE_PASSPORT';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  user: __PRELOADED_STATE__.user.user,
  stories: __PRELOADED_STATE__.user.stories,
  posts: __PRELOADED_STATE__.user.posts,
  following: __PRELOADED_STATE__.user.following,
  passport: __PRELOADED_STATE__.user.passport,
  profile_id: __PRELOADED_STATE__.user.user.id,
};

const middleware = routerMiddleware(browserHistory);

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENT_USER_FOLLOWINGS:
    return {
      ...state,
      following: action.followings
    };
  case UPDATE_AFTER_SUBMIT:
    return {
      ...state,
      stories: action.stories,
      posts: action.posts
    };
  case UPDATE_PASSPORT:
    return {
      ...state,
      passport: action.passport,
    };
    applyMiddleware(middleware);
  default:
    return state;
  }
};


/** ============================================================
 * Define Action Creators
 * ========================================================== */

export const getCurrentUserFollowings = (profile_id) => {
  return dispatch => {
    return axios.get(`/api/followings/${profile_id}`)
      .then(results => {
        dispatch({
          type: SET_CURRENT_USER_FOLLOWINGS,
          followings: results.data,
        });
      });
  };
};

export const updateAfterSubmitPost = (profile_id) => {
  return dispatch => {
    return axios.get(`/api/stories/user/${profile_id}`)
      .then(results => {
        var posts = getPostsFromStories(results.data);
        dispatch({
          type: UPDATE_AFTER_SUBMIT,
          stories: results.data,
          posts: posts
        });
      });
  };
};

export const updatePassport = (profile_id) => {
  return dispatch => {
    return axios.get(`/api/profiles/passport/${profile_id}`)
      .then(results => {
        dispatch({
          type: UPDATE_PASSPORT,
          passport: results.data,
        });
        dispatch(push(`/profile/${initialState.profile_id}`));
      });
  };
};


/** ============================================================
 * Define Helper Functions
 * =============================================================
 */
export const getPostsFromStories = (stories) => {
  var posts = [];
  stories.forEach(story => {
    posts = posts.concat(story.posts);
  });
  return posts;
};