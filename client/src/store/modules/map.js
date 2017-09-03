import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_CENTER = 'map/SET_MAP_CENTER';
export const HANDLE_MAP_MOUNTED = 'map/HANDLE_MAP_MOUNTED';
export const HANDLE_SEARCHBOX_MOUNTED = 'map/HANDLE_SEARCHBOX_MOUNTED';
export const HANDLE_PLACES_CHANGED = 'map/HANDLE_PLACES_CHANGED';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  center: {lat: 36.209681, lng: -115.093977},
  bounds: null,
  _map: null,
  _searchBox: null,
  markers: [],
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
      center: action.center
    };
  case HANDLE_MAP_MOUNTED:
    return {
      ...state,
      _map: action._map
    };
  case HANDLE_SEARCHBOX_MOUNTED:
    return {
      ...state,
      _searchBox: action._searchBox
    };
  case HANDLE_PLACES_CHANGED:
    return {
      ...state,
      center: action.center,
      markers: action.markers
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
    dispatch({
      type: SET_CENTER,
      center: {lat, lng}
    });
  };
};

export const handleMapMounted = (map) => {
  return dispatch => {
    dispatch({
      type: HANDLE_MAP_MOUNTED,
      _map: map
    });
  };
};

export const handleSearchBoxMounted = (searchBox) => {
  return dispatch => {
    dispatch({
      type: HANDLE_SEARCHBOX_MOUNTED,
      _searchBox: searchBox
    });
  };
};

export const handlePlacesChanged = (searchBox) => {
  const places = searchBox.getPlaces();
  const markers = places.map(place => ({
    position: place.geometry.location
  }));
  const center = markers.length > 0 ? markers[0].position : this.state.center;
  return dispatch => {
    dispatch({
      type: HANDLE_PLACES_CHANGED,
      center,
      markers
    });
  };
};