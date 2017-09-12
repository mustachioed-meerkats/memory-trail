import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import profile from '../../styles/profile';
import PostList from './PostList.jsx';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col, Button, ButtonGroup, ListGroupItem, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';


/** ============================================================
 * Import Redux Action Creators
 * ============================================================= */

import { getPostsByUserId } from '../../store/modules/userPosts';
import { followNewUser, getAllFollowings } from '../../store/modules/following';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: Number(props.match.params.id),
      followLabel: 'FOLLOW_LABEL',
      isFollowing: false
    };
  }

  componentWillMount() {
    this.isCurrentUserFollowing();
    this.fetchPosts();
    this.props.getAllFollowings(this.props.user.id);
    this.props.getPostsByUserId(this.props.user.id);
  }

  isCurrentUserFollowing() {
    let profileOwnerId = this.state.userId;
    let isFollowing = this.props.followings.map((following) => {
      return following.following_id;
    })
      .includes(profileOwnerId);
    
    this.setState({
      isFollowing: isFollowing
    });
  }

  followUser() {
    let currentUserId = this.props.user.id;
    let followUserId = this.state.userId;
    this.props.followNewUser(currentUserId, followUserId)
      .then(() => {
        return this.props.getAllFollowings(this.props.user.id);
      })
      .then(() => {
        this.isCurrentUserFollowing();
      })
      .catch((err) => {
        console.log('(Client) Error! Following User');
        console.log(err);
      });
  }

  getFollowButtonLabel() {
    return this.state.isFollowing ? 'Following' : 'Follow';
  }

  fetchPosts() {
    let userId = this.state.userId;
    console.log('Fetching Posts for userId: ', userId);
    this.props.getPostsByUserId(userId);
  }

  render() {
    /*this.state.isFollowing*/
    return (
      <div style={profile.container}>
        <RaisedButton 
          label={this.getFollowButtonLabel()}
          primary={true} 
          style={profile.follow}
          disabled={this.state.isFollowing}
          onClick={this.followUser.bind(this)}
        />

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
  followNewUser,
  getAllFollowings
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);