import axios from 'axios';

/** ============================================================
 * Define Actions
 * ========================================================== */
export const TOGGLE_SIDE_BAR_OPEN = 'TOGGLE_SIDE_BAR_OPEN';
export const TOGGLE_SIDE_BAR_CLOSED = 'TOGGLE_SIDE_BAR_CLOSED';

/** ============================================================
 * Define Initial State - NOT NEEDED IF PRELOADING INITIAL STATE
 * ========================================================== */
const initialState = {
  isVisible: false,
};

/** ============================================================
 * Define Reducer
 * ========================================================== */
export default (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_SIDE_BAR_OPEN:
    return {
      ...state,
      isVisible: !state.isVisible
    };
  case TOGGLE_SIDE_BAR_CLOSED:
    return {
      ...state,
      isVisible: !state.isVisible
    };
  default:
    return state;
  }
};

/** ============================================================
 * Define Action Creators
 * ========================================================== */
export const openSideBar = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SIDE_BAR_OPEN
    });
  };
};

export const closeSideBar = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SIDE_BAR_CLOSED
    });
  };
};