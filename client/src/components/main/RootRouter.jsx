import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateNewPost from './CreateNewPost.jsx';
import Home from './Home.jsx';
import ProfileRouterPage from './ProfileRouterPage.jsx';
import FollowingFeed from './FollowingFeed.jsx';
import LandmarkPage from './LandmarkPage.jsx';
import ErrorPage from './ErrorPage.jsx';

/** ============================================================
 * Define React Routes
 * ========================================================== */
const RootRouter = () => (
  <Switch>
    <Route exact path='/' component={CreateNewPost} />
    <Route exact path='/explore' component={Home} />
    <Route path='/profile/:id' component={ProfileRouterPage} />
    <Route exact path='/feed' component={FollowingFeed} />
    <Route exact path='/landmark/:id' component={LandmarkPage} />
    <Route exact component={ErrorPage} />
  </Switch>
);

export default RootRouter;