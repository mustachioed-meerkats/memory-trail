import axios from 'axios';

/** ============================================================
 * Define Actions
 * =============================================================
 */
export const SET_IS_LOGGED_IN = 'app/SET_IS_LOGGED_IN';

/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  isLoggedIn: false,
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_IS_LOGGED_IN:
    return {
      ...state,
      isLoggedIn: action.isLoggedIn
    };

  default:
    return state;
  }
};

/** ============================================================
 * Define Dispatches
 * =============================================================
 */