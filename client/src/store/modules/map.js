import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_CENTER = 'map/SET_MAP_CENTER';
export const HANDLE_MAP_MOUNTED ='map/HANDLE_MAP_MOUNTED';
export const HANDLE_SEARCHBOX_MOUNTED = 'map/HANDLE_SEARCHBOX_MOUNTED';

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
  inputStyle: {
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    border: '1px solid transparent',
    width: '240px',
    height: '32px',
    marginTop: '27px',
    padding: '0 12px',
    borderRadius: '1px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipses',
  },

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