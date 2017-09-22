import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import profile from '../../styles/profile';
import { Link, Switch, Route } from 'react-router-dom';
import Timeline from './Timeline.jsx';
import CurrentUserPostList from './profile/CurrentUserPostList.jsx';
import FollowingsPageList from './follow/FollowingsPageList.jsx';
import TimelineRouter from './profile/TimelineRouter.jsx';

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
import { handleLandmarkSelect } from '../../store/modules/map';

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
    this.landmarkSelected = this.landmarkSelected.bind(this);
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

  //When the landmark is selected, we can just go to the redux, where we will search the
  //current store for the selected landmark, then if we can't find it we will make an api call.
  //Redirection will be routed through the redux store.
  landmarkSelected(id) {
    let found = '';
    for (var i = 0; i < this.props.landmarks; i++) {
      let landmark = this.props.landmarks[i];
      if (landmark.id === id) {
        found = landmark.id;
      }
    }
    if (this.props.landmarks !== undefined && found !== '') {
      this.props.handleLandmarkSuccess(id);
    } else {
      this.props.handleLandmarkSelect(id);
    }
  }

  render() {
    var followingLink = (<div></div>);
    var followButton = (<span></span>);
    var passportData;
    if (this.state.isCurrentUser) {
      passportData = this.props.user.passport;
      followingLink = (<Link to={`${this.props.match.url}/following`}>Following</Link>);
    } else {
      passportData = this.props.otherUser.passport;
      if (this.state.isFollowing) {
        followButton = (<Button onClick={this.handleUnfollow}>Unfollow</Button>);
      } else {
        followButton = (<Button onClick={this.handleFollow}>Follow</Button>);
      }
    }
    let passport = [... new Set(passportData.map((passportEntry, index) => {
      return `${passportEntry.name} + ${passportEntry.id}`;
    }))];

    return (
      <Container fluid={true}>
        <Grid columns={2}>
          <Grid.Column width={2}>
          <Card raised>
            <Menu text compact vertical>
              <Menu.Header style={{fontSize: '14rm'}}>
                {this.state.profile_display}
                {followButton}
              </Menu.Header>
              <Menu.Item>
                <Link to={`${this.props.match.url}`}>Posts</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`${this.props.match.url}/stories`}>Stories</Link>
              </Menu.Item>
              <Menu.Item>
                {followingLink}
              </Menu.Item>
            </Menu>
          </Card>
          <Divider/>
          <List compact size='large'>
            <List.Item>
              <List.Header>Passport</List.Header>
            </List.Item>
            <List.Content>
              {passport.map((place, index) => {
                let split = place.split('+');
                let name = split[0];
                let id = Number(split[1]);
                return <List.Item onClick={this.landmarkSelected.bind(this, id)} key={index}><Link to={`/profile/${this.props.user.user.id}`} > {name} </Link></List.Item>;
              })}
            </List.Content>
          </List>
          </Grid.Column>
          <Grid.Column width={14}>
            <Switch>
              <Route exact path={`${this.props.match.url}`} render={() => (
                <CurrentUserPostList isCurrentUser={this.state.isCurrentUser} />
              )}/>
              <Route path={`${this.props.match.url}/stories`} render={(props) => (
                <TimelineRouter 
                {...props}
                isCurrentUser={this.state.isCurrentUser} />
              )}/>
              <Route exact path={`${this.props.match.url}/following`} render={() => (
                <FollowingsPageList
                  isCurrentUser={this.state.isCurrentUser} />
              )}/>
            </Switch>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  otherUser: state.otherUser,
  landmarks: state.map.landmarks
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserInfo,
  determineFollowingStatus,
  followNewUser,
  unfollowUser,
  handleLandmarkSelect,
  getCurrentUserFollowings
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileRouterPage);
