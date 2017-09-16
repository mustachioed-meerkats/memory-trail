import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import profile from '../../styles/profile';
import PostList from './PostList.jsx';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col, Button, ButtonGroup, ListGroupItem, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage.jsx';



/** ============================================================
 * Import Redux Action Creators
 * ============================================================= */

import { getPostsByUserId } from '../../store/modules/userPosts';
import { followNewUser, getAllFollowings } from '../../store/modules/following';

class ProfileRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentUser: true,
      profile_id: ''
    };
  }

  componentWillMount() {
    var user_id = Number(this.props.match.params.id);
    this.setState({
      profile_id: user_id,
      isCurrentUser: user_id === this.props.user.id,
    });
  }



  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to={`${this.props.match.url}/stories`}>Stories</Link></li>
            <li><Link to={`${this.props.match.url}/posts`}>Posts</Link></li>
            <li><Link to={`${this.props.match.url}/following`}>Following</Link></li>
          </ul>
        </nav>
        <Route path={`${this.props.match.url}/stories`} render={() => (
          <h3>stories</h3>
        )}/>
        <Route path={`${this.props.match.url}/posts`} render={() => (
          <h3>posts</h3>
        )}/>
        <Route path={`${this.props.match.url}/following`} render={() => (
          <h3>following</h3>
        )}/>
        <Route exact path={this.props.match.url} render={() => (
          <h3>Welcome!</h3>
        )}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  followings: state.following.followings,
  posts: state.posts.currentUserPosts
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPostsByUserId,
  getAllFollowings
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileRouter);