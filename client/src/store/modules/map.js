import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_MAP_CENTER = 'map/SET_MAP_CENTER';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  mapCenter: {lat: 36.209681, lng: -115.093977}
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_MAP_CENTER:
    return {
      ...state,
      mapCenter: action.mapCenter
    };

  default:
    return state;
  }
};

/** ============================================================
 * Define Dispatches
 * =============================================================
 */