import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';
import PostPage from './PostPage.jsx';
import CreateNewPost from './CreateNewPost.jsx';
import FollowingFeed from './FollowingFeed.jsx';
import FollowingsPage from './FollowingsPage.jsx';
import UserProfilePage from './UserProfilePage.jsx';
import CurrentUserProfilePage from './CurrentUserProfilePage.jsx';
import Timeline from './Timeline.jsx';
import TestPage from './TestPage.jsx';

const RootRouter = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/profile' component={CurrentUserProfilePage} />
    <Route exact path='/profile/:id' component={UserProfilePage} />
    <Route exact path='/feed' component={FollowingFeed} />
    <Route exact path='/post/new' component={CreateNewPost} />
    <Route exact path='/post/:id' component={PostPage} />
    <Route exact path='/followings' component={FollowingsPage} />
    <Route exact path='/timeline' component={Timeline} />
    <Route exact path='/testpage' component={TestPage} />
  </Switch>
);

export default RootRouter;