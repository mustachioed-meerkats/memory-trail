import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import map from './map';
import posts from './posts';
import user from './user';
import newpost from './newpost';
import newstory from './newstory';
import following from './following';

export default combineReducers({
  routing: routerReducer,
  user,
  map,
  newpost,
  posts,
  newstory,
  following
});