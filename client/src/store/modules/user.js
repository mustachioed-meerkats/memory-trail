/** ============================================================
 * Define Initial State
 * =============================================================
 */
const initialState = {
  user: __PRELOADED_STATE__.currentUser,
  stories: __PRELOADED_STATE__.stories,
  posts: __PRELOADED_STATE__.posts,
  following: __PRELOADED_STATE__.following,
};

/** ============================================================
 * Define Reducer
 * =============================================================
 */
export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
