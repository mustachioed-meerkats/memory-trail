import axios from 'axios';
import { routerMiddleware, push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import {createStore} from 'redux';
import thunk from 'redux-thunk';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_CENTER = 'map/SET_MAP_CENTER';
export const HANDLE_PLACES_CHANGED = 'map/HANDLE_PLACES_CHANGED';
export const HANDLE_BOUNDS_CHANGED = 'map/HANDLE_BOUNDS_CHANGED';
export const HANDLE_SEARCH_AREA = 'map/HANDLE_SEARCH_AREA';
export const HANDLE_MARKER_CLICK = 'map/HANDLE_MARKER_CLICK';
export const HANDLE_MARKER_CLOSE = 'map/HANDLE_MARKER_CLOSE';
export const HANDLE_STORY_LOAD = 'map/HANDLE_STORY_LOAD';
export const HANDLE_LANDMARK_SELECT = 'map/HANDLE_LANDMARK_SELECT';
/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  center: __PRELOADED_STATE__.map,
  bounds: null,
  landmarks: [],
  markers: [],
  storyPosts: [],
  userLocationAvailable: false
};

//The middleware below allows us to redirect from the redux store. 
const middleware = routerMiddleware(browserHistory);


/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_CENTER:
    return {
      ...state,
      center: action.center,
      userLocationAvailable: true,
      markers: action.markers,
      landmarks: action.landmarks
    };
  case HANDLE_PLACES_CHANGED:
    return {
      ...state,
      center: action.center,
      markers: action.markers,
      landmarks: action.landmarks
    };
  case HANDLE_LANDMARK_SELECT:
    return {
      ...state,
      landmarks: state.landmarks.concat(action.landmarks)
    };
  case HANDLE_BOUNDS_CHANGED:
    return {
      ...state,
      bounds: action.bounds,
      center: action.center
    };
  case HANDLE_STORY_LOAD:
    return {
      ...state,
      storyPosts: action.storyPosts
    };
  case HANDLE_SEARCH_AREA:
    return {
      ...state,
      markers: action.markers,
      landmarks: action.landmarks
    };
  case HANDLE_MARKER_CLICK:
    return {
      ...state,
      landmarks: state.landmarks.map(marker => {
        if (marker === action.targetMarker) {
          return {
            ...marker,
            showInfo: true
          };
        }
        return marker;
      })
    };
  case HANDLE_MARKER_CLOSE:
    return {
      ...state,
      landmarks: state.landmarks.map(marker => {
        if (marker === action.targetMarker) {
          return {
            ...marker,
            showInfo: false
          };
        }
        return marker;
      })
    };
    applyMiddleware(middleware);
  default:
    return state;
  }
};

/** ============================================================
 * Define Dispatches
 * =============================================================
 */

export const handleLandmarkSelect = (id) => {
  return dispatch => {
    return getLandmarkByID(id)
    .then(results => {
      //When we only get one landmark, a problem that we face is that it comes back as an object, we need an array.
      let resultsArr = [];
      resultsArr.push(results.data);
      dispatch({
        type: HANDLE_LANDMARK_SELECT,
        landmarks: resultsArr,
      }),
    dispatch(push(`/landmark/${id}`));
      return results;
    });
  };
};

export const handleLandmarkSuccess = (id) => {
  return dispatchEvent => {
    dispatch(push(`/landmark/${id}`));
  };
};

export const setCenter = (lat, lng) => {
  return dispatch => {
    return getLandmarksWithinRadius({lat, lng})
      .then(results => {
        var posts = getPostsFromLandmarks(results.data);
        dispatch({
          type: SET_CENTER,
          center: {lat, lng},
          markers: posts,
          landmarks: results.data,
        });
      });
  };
};

export const handlePlacesChanged = (searchBox, oldCenter) => {
  var places = searchBox.getPlaces().map(place => ({
    position: place.geometry.location
  }));
  const center = places.length > 0 ? places[0].position : oldCenter;
  return dispatch => {
    return getLandmarksWithinRadius({lat: center.lat(), lng: center.lng()})
      .then(results => {
        var posts = getPostsFromLandmarks(results.data);
        dispatch({
          type: HANDLE_PLACES_CHANGED,
          markers: posts,
          landmarks: results.data,
          center: {lat: center.lat(), lng: center.lng()}
        });
      });
  };
};

export const handleBoundsChanged = (map) => {
  return dispatch => {
    dispatch({
      type: HANDLE_BOUNDS_CHANGED,
      bounds: map.getBounds(),
      center: {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
    });
  };
};

export const handleSearchArea = (center) => {
  return dispatch => {
    return getLandmarksWithinRadius(center)
      .then(results => {
        var posts = getPostsFromLandmarks(results.data);
        dispatch({
          type: HANDLE_SEARCH_AREA,
          markers: posts,
          landmarks: results.data,
        });
      });
  };
};

export const handleStoryLoad = (storyID) => {
  return dispatch => {
    return getPostsByStory(userID, title)
      .then(results => {
        dispatch({
          type: HANDLE_STORY_LOAD,
          storyPosts: results.data,
        });
      });
  };
};

export const handleMarkerClick = (marker) => {
  return dispatch => {
    dispatch({
      type: HANDLE_MARKER_CLICK,
      targetMarker: marker
    });
  };
};

export const handleMarkerClose = (marker) => {
  return dispatch => {
    dispatch({
      type: HANDLE_MARKER_CLOSE,
      targetMarker: marker
    });
  };
};

// helper function
export const getPostsWithinRadius = (center) => {
  return axios.post('/api/posts/nearby', center);
};

export const getLandmarksWithinRadius = (center) => {
  return axios.post('/api/landmarks/nearby', center);
};

export const getPostsByStory = (title) => {
  return axios.post('/api/posts/story', title);
};

export const getPostsFromLandmarks = (landmarks) => {
  var posts = [];
  landmarks.forEach(landmark => {
    posts = posts.concat(landmark.posts);
  });
  return posts;
};

export const getLandmarkByID = (id) => {
  return axios.get(`/api/landmarks/${id}`);
};