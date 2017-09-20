import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import profile from '../../styles/profile';
import { Link, Switch, Route } from 'react-router-dom';
import Timeline from './Timeline.jsx'; 
import CurrentUserPostList from './profile/CurrentUserPostList.jsx';
import FollowingsPageList from './follow/FollowingsPageList.jsx';
import SentimentAnalysis from './SentimentAnalysis.jsx';

/** ============================================================
 * Import Semantic UI Components
 * =============================================================
 */
import {
  Button,
  Card,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  List,
  Menu,
  Message,
  Segment,
  Table,
  TextArea,
  Transition
} from 'semantic-ui-react';

/** ============================================================
 * Import Redux Action Creators
 * ============================================================= */

import { followNewUser, unfollowUser } from '../../store/modules/following';
import { getUserInfo, determineFollowingStatus } from '../../store/modules/otherUser';
import { getCurrentUserFollowings } from '../../store/modules/user';

class ProfileRouterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentUser: true,
      profile_display: '',
      profile_id: '',
      isFollowing: false
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentWillMount() {
    var user_id = Number(this.props.match.params.id);
    this.handleUserChange(user_id);
  }

  componentWillReceiveProps(nextProps) {
    var new_user_id = Number(nextProps.match.params.id);
    if (this.state.profile_id !== new_user_id) {
      this.handleUserChange(Number(nextProps.match.params.id));
    }
  }

  handleUserChange(user_id) {
    if (user_id !== this.props.user.user.id) {
      this.props.getUserInfo(user_id)
        .then(() => {
          this.setState({
            isCurrentUser: false,
            profile_id: this.props.otherUser.user.id,
            profile_display: this.props.otherUser.user.display || this.props.otherUser.user.email
          });
        })
        .then(() => {
          this.isCurrentUserFollowing();
        });
    } else {
      this.setState({
        isCurrentUser: true,
        profile_id: this.props.user.user.id,
        profile_display: this.props.user.user.display || this.props.user.user.email
      });
    }
  }

  isCurrentUserFollowing() {
    let profileOwnerId = Number(this.props.match.params.id);
    let isFollowing = this.props.user.following.map((following) => {
      return following.following_id;
    }).includes(profileOwnerId);
    this.setState({
      isFollowing: isFollowing
    });
  }

  handleFollow() {
    this.props.followNewUser(this.props.user.user.id, this.state.profile_id)
      .then(() => {
        return this.props.getCurrentUserFollowings(this.props.user.user.id);
      })
      .then(() => {
        this.setState({
          isFollowing: true
        });
      });
  }

  handleUnfollow() {
    this.props.unfollowUser(this.props.user.user.id, this.state.profile_id)
      .then(() => {
        return this.props.getCurrentUserFollowings(this.props.user.user.id);
      })
      .then(() => {
        this.setState({
          isFollowing: false
        });
      });
  }

  render() {
    var followingLink = (<div></div>);
    var followButton = (<span></span>);
    var sentimentLink = (<div></div>);
    var passportData;
    if (this.state.isCurrentUser) {
      passportData = this.props.user.passport;
      followingLink = (<Link to={`${this.props.match.url}/following`}>Following</Link>);
      sentimentLink = (<Link to={`${this.props.match.url}/sentiment`}>Sentiment Analysis</Link>);
    } else {
      passportData = this.props.otherUser.passport;
      if (this.state.isFollowing) {
        followButton = (<Button onClick={this.handleUnfollow}>Unfollow</Button>);
      } else {
        followButton = (<Button onClick={this.handleFollow}>Follow</Button>);
      }
    }

    let passport = [... new Set(passportData.map((passportEntry, index) => {
      return passportEntry.name;
    }))];

    return (
      <Container fluid={true}>
        <Grid columns={2}>
          <Grid.Column width={2}>
          <div>
            {this.state.profile_display}
            {followButton}
          </div>
          <Menu text vertical size='large'>
            <Menu.Item>
              <Link to={`${this.props.match.url}`}>Stories</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={`${this.props.match.url}/posts`}>Posts</Link>
            </Menu.Item>
            <Menu.Item>
              {followingLink}
            </Menu.Item>
            <Menu.Item>
            {sentimentLink}
            </Menu.Item>
          </Menu>
          <Divider/>
          <List relaxed size='large'>
            <List.Item>
              <List.Header>Passport</List.Header>
            </List.Item>
            <List.Content>
              {passport.map((place, index) => {
                return <List.Item key={index}>{place}</List.Item>
              })}
            </List.Content>
          </List>
          </Grid.Column>
          <Grid.Column width={14}>
            <Route exact path={`${this.props.match.url}`} render={() => (
              <Timeline isCurrentUser={this.state.isCurrentUser} />
            )}/>
            <Route exact path={`${this.props.match.url}/posts`} render={() => (
              <CurrentUserPostList isCurrentUser={this.state.isCurrentUser} />
            )}/>
            <Route exact path={`${this.props.match.url}/following`} render={() => (
              <FollowingsPageList 
                isCurrentUser={this.state.isCurrentUser} 
                handleUserChange={this.handleUserChange}/>
            )}/>
            <Route exact path={`${this.props.match.url}/sentiment`} render={() => (
              <SentimentAnalysis isCurrentUser={this.state.isCurrentUser} />
            )}/>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  otherUser: state.otherUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserInfo,
  determineFollowingStatus,
  followNewUser,
  unfollowUser,
  getCurrentUserFollowings
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileRouterPage);