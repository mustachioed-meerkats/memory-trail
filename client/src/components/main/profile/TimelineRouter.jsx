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
  Transition
} from 'semantic-ui-react';

class TimelineRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStories: '',
      // currentStory: '',
      chartVisible: false
    };
    this.toggleChartVisibility = this.toggleChartVisibility.bind(this);
    this.updateSelectedStory = this.updateSelectedStory.bind(this);
  }

  componentWillMount () {
    let userData = this.props.isCurrentUser ? this.props.user : this.props.otherUser;
    this.setState({
      userStories: userData.stories,
      // currentStory: userData.stories[0],
    });
  }

  toggleChartVisibility() {
    this.setState({
      chartVisible: !this.state.chartVisible
    });
  }

  updateSelectedStory(e) {
    console.log('selected: ', e.target);
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
    return (
      <Container fluid={true}>
        <Card raised fluid>
          <Card.Header>
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
              <Button onClick={this.toggleChartVisibility}>
                Sentiment Analysis
              </Button>
            </Menu>
          </Card.Header>
          <Card.Content>
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
          </Card.Content>
        </Card>
      </Container>
    );
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

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineRouter);
