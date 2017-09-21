import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import profile from '../../styles/profile';
import { Link, Switch, Route } from 'react-router-dom';
import Timeline from './Timeline.jsx';

class TimelineRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Container fluid={true}>
        <Card raised fluid>
          <Card.Header>
            <Menu vertical={false} size='large'>
              <Dropdown
                closeOnBlur={true}
                scrolling
                item
                text={'Choose a Story'}
                options={this.state.userStories.map((story, index) => {
                  return {value: story.title, text: story.title, key: index}
                })}
                onChange={(e) => this.updateSelectedStory(e)}
                >
              </Dropdown>
              <Button onClick={this.toggleChartVisibility}>
                Sentiment Analysis
              </Button>
            </Menu>
          </Card.Header>
          <Card.Content>
            <Route exact path={`${this.props.match.url}`} render={() => (
              <CurrentUserPostList isCurrentUser={this.state.isCurrentUser} />
            )}/>
            <Route exact path={`${this.props.match.url}/stories`} render={() => (
              <Timeline isCurrentUser={this.state.isCurrentUser} />
            )}/>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}