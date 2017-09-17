import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import map from './map';
import posts from './posts';
import user from './user';
import otherUser from './otherUser';
import newpost from './newpost';
import newstory from './newstory';
import following from './following';
import sidebar from './sidebar';

export default combineReducers({
  routing: routerReducer,
  user,
  otherUser,
  map,
  newpost,
  posts,
  newstory,
  following,
  sidebar
});