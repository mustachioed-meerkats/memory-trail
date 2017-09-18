import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autocomplete from 'react-google-autocomplete';
import Upload from './Upload.jsx';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */

import {
  Button,
  Card,
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
  Modal,
  Segment,
  Table,
  TextArea,
  Transition
} from 'semantic-ui-react';

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */

import {
  handleTitleInput,
  handleContentTextArea,
  handleLocationInput,
  handleStoryLoad,
  handleNewPost,
} from '../../store/modules/newpost';


/** ============================================================
 * Define Component
 * ========================================================== */


class CreateNewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyFormVisible: false,
      dropdownVisible: false,
      landmark: '',
      storyTitleForm: '',
      storySummaryForm: '',
      show: false,
      storyID: 0,
      storyName: 'EveryDay Life',
      defaultStory: 'EveryDay Life'
    };
    this.geocodeLocationInput = this.geocodeLocationInput.bind(this);
    this.initializeAutocomplete = this.initializeAutocomplete.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleStoryFormVisibility = this.handleStoryFormVisibility.bind(this);
    this.handleDropdownVisibility = this.handleDropdownVisibility.bind(this);
    this.storySubmit = this.storySubmit.bind(this);
    this.storySelected = this.storySelected.bind(this);
  }

  /*
  When our component loads, we need to load all of the stories for the current user.
  Once this happens, we need to check for a default story, which then becomes the story that is 
  added to on default. 
  */

  componentWillMount () {
    //First, we are going to get the stories created by this user...
    this.props.handleStoryLoad()
    .then(() => {
      //Next, we are going to map through them and find which on is the default. 
      //The default story will be preloaded as the story that we post to. 
      this.props.stories.map((story) => {
        if (story.default_post === true) {
          this.setState({storyID: story.id, defaultStory: story.title, storyName: story.title});
        }
      });
    });
  }


  /*
  The following code is designed to run the geolocation in our search box when a user
  selects where they made the post. 
  */
  geocodeLocationInput (location) {
    // calls google geocoding API to fetch lat/lng from address selected in autocomplete form
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDXLOMgs19AOUHeizaMnRwjVyzxcTGWmJ8`;
    return axios.get(url)
      .then((res) => {
        // action handler to update location value in state
        this.props.handleLocationInput(res.data.results[0].geometry.location);
      })
      .catch((err) => {
        console.log('failed', err);
      });
  }

/*
This code below is designed to run the autocomplete search box for the location search.
*/


  // Autocomplete feature for the form's location input field
  initializeAutocomplete () {
    let input = document.getElementById('locationInput');
    // render predictions from google autocomplete using input from location field
    let autocomplete = new google.maps.places.Autocomplete(input);
    let place;
    // listen for location selection from the dropdown
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      place = autocomplete.getPlace();
      // populate landmark object with data from google places
      let image_url;
      if (place.photos) {
        image_url = place.photos[0].getUrl({
          maxWidth: 1080
        });
      } else {
        image_url = '';
      }
      this.setState({
        landmark: {
          google_id: place.place_id,
          name: place.name,
          image_url: image_url,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });
      // when a place is selected, use its address property to call google geocoding API
      this.geocodeLocationInput(place.formatted_address);
    });
  }

  /*
  When a post is submitted, the relevant information is added to the postObject, 
  then sent to the api within redux. The page is also routed from that end to the users profile page.  
  */

  handlePostSubmit (landmark) {
    let post = {
      content: this.props.content,
      lat: this.props.location.lat,
      lng: this.props.location.lng,
      profile_id: this.props.user.id,
      profile_display: this.props.user.display,
      image_url: this.props.image_url,
      story_id: this.state.storyID,
      story_name: this.state.storyName
    };

    var postObject = {
      post: post,
      landmark: this.state.landmark
    };
    return this.props.handleNewPost(postObject);
  }

  /*
  This function exists so that we can send an api call for story submission, then close the modal and reload the stories. 
  */

  storySubmit () {
    const storyInfo = {
      title: this.state.storyTitleForm,
      summary: this.state.storySummaryForm,
      profile_id: this.props.user.id,
    };
    return axios.post('/api/stories/new', storyInfo)
      .then(result => {
        this.setState({
          storyID: result.data.id,
          storyName: result.data.title
        });
        this.props.handleStoryLoad();
        this.handleStoryFormVisibility();
      })
      .catch((err) => {
        console.log('failed', err);
      });

  }

  /*
    When a story is selected by a user in the dropdown box, it will simply set the story in the 
    local state. When a post is created, it will be associated with the appropriate story. 
  */

  storySelected (selectedStory) {
    this.props.stories.map((story) => {
      if (story.title === selectedStory) {
        this.setState({storyID: story.id, storyName: story.title});
      }
    });
    this.handleDropdownVisibility();
  }

  //Activates modal for the story creation form. 

  handleStoryFormVisibility () {
    this.setState({storyFormVisible: !this.state.storyFormVisible});
  }

  //Activates modal for the story selection dropbox. 

  handleDropdownVisibility () {
    this.setState({ dropdownVisible: !this.state.dropdownVisible });
  }

  //These functions set our input forms to the local state. 

  handleStorySummary (event) {
    this.setState({ storySummaryForm: event });
  }

  handleStoryTitle (event) {
    this.setState({storyTitleForm: event });
  }

  render () {
    return (
      <Grid centered columns={2} stackable>
        <Grid.Row>
          <Upload />
        </Grid.Row>
        <Message positive>
          <Message.Header>Your current story is {this.state.storyName} </Message.Header>
            <p>FYI, {this.state.defaultStory} is your default story.</p>
        </Message>
        <Grid.Row>
          <Grid.Column>
            <Button.Group size='massive' fluid={true}>
              <Button content='New Story' onClick={this.handleStoryFormVisibility}/>
              <Button.Or/>
              <Button content='Select' onClick={this.handleDropdownVisibility}/>
            </Button.Group>
            <Modal size= 'tiny' open={this.state.storyFormVisible} onClose={this.handleStoryFormVisibility}>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <Input fluid={true} size='huge' placeholder='Name Your Story' onChange={(e) => this.handleStoryTitle(e.target.value)}/>
                    <br/>
                    <TextArea style={{fontSize: '20px'}} placeholder='Story Summary' onChange={(e) => this.handleStorySummary(e.target.value)} />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={this.handleStoryFormVisibility} >
                  Cancel
                </Button>
                <Button positive onClick={this.storySubmit}>
                  Submit
                </Button>
              </Modal.Actions>
            </Modal>
            <Transition.Group animation='slide down' duration='500ms'>
              {this.state.dropdownVisible &&
              <Card fluid={true}>
                <List
                  relaxed
                  selection
                  size='big'
                  >
                  {this.props.stories.map((story, index) => {
                    return <List.Item key={index} onClick={() => this.storySelected(story.title)} content={story.title} value={story.title}/>;
                  })}
                </List>
              </Card>
              }
            </Transition.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form>
              <TextArea
                style={{fontSize: '20px'}}
                placeholder='Record a Memory!'
                onChange={(e) => { this.props.handleContentTextArea(e.target.value); }}
                />
              <br/>
              <br/>
              <Input
                id='locationInput'
                fluid={true}
                size='huge'
                icon='compass'
                onChange={this.initializeAutocomplete}
                placeholder='Enter a Location...' />
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button fluid={true} size='massive' color='teal' onClick={() => this.handlePostSubmit(this.state.landmark)}>Publish</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}


/** ============================================================
 * Define Class Properties
 * ========================================================== */

const mapStateToProps = state => ({
  content: state.newpost.content,
  location: state.newpost.location,
  map: state.map.center,
  user: state.user.user,
  image_url: state.newpost.image_url,
  stories: state.newpost.allUserStories,
});

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */

const mapDispatchToProps = dispatch => bindActionCreators({
  handleContentTextArea: handleContentTextArea,
  handleLocationInput: handleLocationInput,
  handleStoryLoad: handleStoryLoad,
  handleNewPost: handleNewPost,
}, dispatch);

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewPost);