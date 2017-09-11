import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import map from './map';
import posts from './posts';
import user from './user';
import newpost from './newpost';
import userPosts from './userPosts';
import newstory from './newstory';

export default combineReducers({
  routing: routerReducer,
  user,
  map,
  newpost,
  posts,
  newstory,
  userPosts
});
