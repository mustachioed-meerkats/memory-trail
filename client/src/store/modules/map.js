import axios from 'axios';

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
/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  center: {lat: 36.209681, lng: -115.093977},
  bounds: null,
  markers: [],
  storyPosts: [],
};
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
      markers: action.markers
    };
  case HANDLE_PLACES_CHANGED:
    return {
      ...state,
      center: action.center,
      markers: action.markers
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
      markers: action.markers
    };
  case HANDLE_MARKER_CLICK:
    return {
      ...state,
      markers: state.markers.map(marker => {
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
      markers: state.markers.map(marker => {
        if (marker === action.targetMarker) {
          return {
            ...marker,
            showInfo: false
          };
        }
        return marker;
      })
    };
  default:
    return state;
  }
};

/** ============================================================
 * Define Dispatches
 * =============================================================
 */
export const setCenter = (lat, lng) => {
  return dispatch => {
    return getPostsWithinRadius({lat, lng})
      .then(results => {
        dispatch({
          type: SET_CENTER,
          center: {lat, lng},
          markers: results.data
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
    return getPostsWithinRadius({lat: center.lat(), lng: center.lng()})
      .then(results => {
        console.log('results: ', results);
        dispatch({
          type: HANDLE_PLACES_CHANGED,
          markers: results.data,
          center: {lat: center.lat(), lng: center.lng()}
        });
      });
  };
};

export const handleBoundsChanged = (map) => {
  console.log('center changed: ', map.getCenter().lat(), map.getCenter().lng());
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
    return getPostsWithinRadius(center)
      .then(results => {
        dispatch({
          type: HANDLE_SEARCH_AREA,
          markers: results.data
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

<<<<<<< HEAD
export const getPostsByStory = (storyID) => {
  return axios.post('/api/posts/story', storyID);
=======
export const getPostsByStory = (title) => {
  return axios.post('/api/posts/story', title);
>>>>>>> Changed the timeline back to the original.
};