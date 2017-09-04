import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import map from './map';
import counter from './counter';
import posts from './posts';
import user from './user';
import newpost from './newpost';

/** ============================================================
 * 
 * =============================================================
 */
export default combineReducers({
  routing: routerReducer,
  app,
  user,
  map,
  counter,
  newpost,
  posts
});
