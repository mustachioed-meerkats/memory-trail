import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import map from './map';
import posts from './posts';
import user from './user';
import newpost from './newpost';
import following from './following';
import sidebar from './sidebar';

export default combineReducers({
  routing: routerReducer,
  user,
  map,
  newpost,
  posts,
  following,
  sidebar
});