import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import Timeline from '../Timeline.jsx';

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
  Transition,
  Dimmer,
  Loader
} from 'semantic-ui-react';

import {getUserInfo} from '../../../store/modules/otherUser';

class TimelineRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStories: [],
      chartVisible: false
    };
    this.toggleChartVisibility = this.toggleChartVisibility.bind(this);
    this.updateSelectedStory = this.updateSelectedStory.bind(this);
  }

  componentWillMount () {
    var userId = Number(this.props.match.url.split('/')[2]);
    this.setUserStories(userId, this.props.user, this.props.otherUser);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.otherUser.stories.length !== this.props.otherUser.stories.length) {
      var userId = Number(this.props.match.url.split('/')[2]);
      this.setUserStories(userId, nextProps.user, nextProps.otherUser);
    }
  }

  setUserStories(userId, user, otherUser) {
    var isCurUser = (userId === user.user.id);
    var userData = isCurUser ? user : otherUser;
    if (userData.stories.length !== 0) {
      this.setState({
        userStories: userData.stories,
      });
    } else if (userData.stories.length === 0 && !isCurUser) {
      this.props.getUserInfo(userId);
    }
  }

  toggleChartVisibility() {
    this.setState({
      chartVisible: !this.state.chartVisible
    });
  }

  updateSelectedStory(e) {
    e.persist();
    let selectedStory = this.state.userStories.filter((story) => {
      return story.title === e.target.textContent;
    });
    if (selectedStory.length > 0) {
      this.setState({
        currentStory: selectedStory[0]
      });
    }
  }

  render() {
  if (this.state.userStories.length !== 0) {
    return (
      <Container fluid={true} style={{backgroundColor: '#f6f6f6'}}>
        <Menu vertical={false} size='large'>
          <Dropdown 
          text='Choose a Story' 
          closeOnBlur={true}
          scrolling
          item
          onChange={(e) => this.updateSelectedStory(e)}>
            <Dropdown.Menu>
              {this.state.userStories.map((story, index) => {
                return (<Link to={`${this.props.match.url}/${story.id}`} key={index}><Dropdown.Item value={story.id} text={story.title} key={index}/></Link>);
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Button onClick={this.toggleChartVisibility} style={{backgroundColor: '#3fbad9', color: 'white'}}>
              View Emotions
            </Button>
          </Menu.Item>
        </Menu>
            <Switch>
              <Route exact path={`${this.props.match.url}`} render={(props) => (
                <Timeline 
                {...props}
                isCurrentUser={this.props.isCurrentUser}
                chartVisible={this.state.chartVisible}
                />
              )}/>
              <Route path={`${this.props.match.url}/:storyId`} render={(props) => (
                <Timeline 
                {...props}
                isCurrentUser={this.props.isCurrentUser}
                chartVisible={this.state.chartVisible}
                />
              )}/>
            </Switch>
      </Container>
    );
  } else {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
}
}

/** ============================================================
 * Define State Subscriptions
 * =============================================================
 */
const mapStateToProps = state => ({
  user: state.user,
  otherUser: state.otherUser
});

/** ============================================================
 * Define Dispatches Subscriptions
 * =============================================================
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineRouter);
