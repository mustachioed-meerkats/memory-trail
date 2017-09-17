import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import profile from '../../styles/profile';
import PostList from './PostList.jsx';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col, Button, ButtonGroup, ListGroupItem, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';
import DummyTimeLine from './DummyTimeLine.jsx'; 
import CurrentUserPostList from './profile/CurrentUserPostList.jsx';
import FollowingsPageList from './follow/FollowingsPageList.jsx';


/** ============================================================
 * Import Redux Action Creators
 * ============================================================= */

import { followNewUser, getAllFollowings } from '../../store/modules/following';
import { getUserInfo } from '../../store/modules/otherUser';

class ProfileRouterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentUser: true,
      profile_display: ''
    };
  }

  componentWillMount() {
    var user_id = Number(this.props.match.params.id);
    console.log('visiting this user page: ', user_id);
    console.log(this.props.user.user.id);
    if (user_id !== this.props.user.user.id) {
      console.log('this is not current user');
      this.props.getUserInfo(user_id)
        .then(() => {
          this.setState({
            isCurrentUser: false,
            profile_display: this.props.otherUser.user.display || this.props.otherUser.user.email
          });
        });
    } else {
      console.log('this is the current user');
      this.setState({
        profile_display: this.props.user.user.display || this.props.user.user.email
      });
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.profile_display}</div>
        <nav>
          <ul>
            <li><Link to={`${this.props.match.url}`}>Stories</Link></li>
            <li><Link to={`${this.props.match.url}/posts`}>Posts</Link></li>
            <li><Link to={`${this.props.match.url}/following`}>Following</Link></li>
          </ul>
        </nav>
        <Route exact path={`${this.props.match.url}`} render={() => (
          <DummyTimeLine isCurrentUser={this.state.isCurrentUser} />
        )}/>
        <Route exact path={`${this.props.match.url}/posts`} render={() => (
          <CurrentUserPostList isCurrentUser={this.state.isCurrentUser} />
        )}/>
        <Route exact path={`${this.props.match.url}/following`} render={() => (
          <FollowingsPageList isCurrentUser={this.state.isCurrentUser} />
        )}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  otherUser: state.otherUser,
  followings: state.following.followings,
  posts: state.posts.currentUserPosts
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllFollowings,
  getUserInfo
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileRouterPage);