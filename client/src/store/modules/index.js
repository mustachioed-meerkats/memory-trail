import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import map from './map';
import counter from './counter';
import posts from './posts';

/** ============================================================
 * 
 * =============================================================
 */
export default combineReducers({
  routing: routerReducer,
  app,
  map,
  counter,
  posts
});
