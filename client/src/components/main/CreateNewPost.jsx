import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autocomplete from 'react-google-autocomplete';
import Upload from './Upload.jsx';

/** ============================================================
 * Define React Bootstrap Components
 * =============================================================
 */
import { Grid, Row, Col } from 'react-bootstrap';
import { Modal, Button, MenuItem, ButtonToolbar, ControlLabel, Form, FormGroup, DropdownButton, FormControl, Radio, ButtonGroup } from 'react-bootstrap';

/** ============================================================
 * Define Store Modules
 * =============================================================
 */
import {
  handleTitleInput,
  handleContentTextArea,
  handleLocationInput,
  handleStoryLoad,
} from '../../store/modules/newpost';

import {
  handleStorySummary,
  handleStoryTitle,
} from '../../store/modules/newstory';

class CreateNewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landmark: '',
      show: false,
      storyID: 0, 
      storyName: 'None Selected',
    };
    this.geocodeLocationInput = this.geocodeLocationInput.bind(this);
    this.initializeAutocomplete = this.initializeAutocomplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  geocodeLocationInput (location) {
    // calls google geocoding API to fetch lat/lng from address selected in autocomplete form
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDXLOMgs19AOUHeizaMnRwjVyzxcTGWmJ8`;
    return axios.get(url)
      .then((res) => {
        console.log('response from geocoding API: ', res);
        // action handler to update location value in state
        this.props.handleLocationInput(res.data.results[0].geometry.location);
      })
      .catch((err) => {
        console.log('(Client) Error calling Google Geocoding API');
      });
  }

  // Autocomplete feature for the form's location input field
  initializeAutocomplete () {
    let input = document.getElementById('locationInput');
    // render predictions from google autocomplete using input from location field
    let autocomplete = new google.maps.places.Autocomplete(input);
    let place;
    // listen for location selection from the dropdown
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      place = autocomplete.getPlace();
      console.log(place);
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
      console.log('landmark object: ', this.state.landmark);
      // when a place is selected, use its address property to call google geocoding API
      this.geocodeLocationInput(place.formatted_address);
    });
  }

  handleSubmit (landmark) {
    let post = {
      title: this.props.title,
      content: this.props.content,
      lat: this.props.location.lat,
      lng: this.props.location.lng,
      profile_id: this.props.user.id,
      profile_display: this.props.user.display,
      image_url: this.props.image_url,
      storyID: this.storyID
    };
    console.log(post);

    console.log('(Client) Intiating POST Request! CREATING NEW POST');

    var postObject = {
      post: post,
      landmark: this.state.landmark
    };

    return axios.post('/api/posts/new', postObject)
      .then(result => {
        console.log('(Client) Success! CREATING NEW POST');
        // TODO: Add redirection to Explore Map
      })
      .catch((err) => {
        console.log('(Client) Error! CREATING NEW POST');
        console.log(err);
      });
  }


  storySubmit () {
    console.log('Story submitting');
    const storyInfo = {
      title: this.props.storyTitle,
      summary: this.props.storySummary,
      profile_id: this.props.user.id,
    };
    return axios.post('/api/stories/new', storyInfo)
      .then(result => {
        console.log('STORY CREATED', result);
      })
      .catch((err) => {
        console.log('STORY CREATION FAILED');
      });
  }

  submitClick () {
    this.storySubmit();
    this.hideModal();
    this.props.handleStoryLoad();
  }

  storySelected (name) {
    let localID = 0;
    this.props.stories.map((story) => {
      if (story.title === name) {
        localID = story.id;
        this.setState({storyID: localID, storyName: story.title});
      }
    });
  }
  showModal () {
    this.setState({show: true});
  }

  hideModal () {
    this.setState({show: false});
  }

  componentDidMount() {
    this.props.handleStoryLoad();
  }

  hideModal () {
    this.setState({show: false});
    
  }
  render () {
    return (
      <Grid>
        <Row>
          <Col sm={4}>
          </Col>
          <Col sm={4}>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.showModal.bind(this)}>
                Add a story!
              </Button>
              <Modal
                show={this.state.show}
                onHide={this.hideModal.bind(this)}
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-lg">Tell us about your adventure!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FormGroup>
                    <FormControl
                      type = 'text'
                      onChange={(e) => { this.props.handleStoryTitle(e.target.value); }}
                      placeholder = 'Title'
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type = 'text'
                      onChange={(e) => { this.props.handleStorySummary(e.target.value); }}
                      placeholder = 'Tell us about your story!'
                      bsSize = 'lg'
                      componentClass="textarea"
                      rows={8}
                      maxLength={4000}
                    />
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.hideModal.bind(this)}>Close</Button>
                  <Button onClick={this.submitClick.bind(this)} > Submit Story </Button>
                </Modal.Footer>
              </Modal>
            </ButtonToolbar>
            <ButtonToolbar>
              <DropdownButton bsSize="large" title="Choose A Story!!" id="dropdown-size-large" >
                {this.props.stories.map((story, i) => {
                  return <MenuItem key={i} eventKey= {story.title} onSelect={(eventKey) => { this.storySelected(eventKey); }} >{story.title}</MenuItem>;
                })}
              </DropdownButton>
            </ButtonToolbar>
            Current Story {this.state.storyName}.
          </Col>
          <Col sm={4}>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
          </Col>
          <Col sm={4}>
            <form>
              <FormGroup>
                <FormControl
                  type="text" 
                  onChange={(e) => { this.props.handleTitleInput(e.target.value); }}
                  placeholder="Title"
                />
              </FormGroup>
              <FormGroup>
                <Autocomplete
                  className="form-control"
                  id="locationInput"
                  placeholder="Search for places"
                  style={{width: '100%'}}
                  onChange={this.initializeAutocomplete}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  componentClass="textarea"
                  onChange={(e) => { this.props.handleContentTextArea(e.target.value); }}
                  placeholder="Memory..."
                />
              </FormGroup>
            </form>
          </Col>
          <Col sm={4}>
          </Col>
        </Row>
        <Row>
          <Upload/>
        </Row>
        <Row>
          <Col sm={4}>
          </Col>
          <Col sm={4}>
            <ButtonToolbar style={{textAlign: 'center'}}>
              <Button type="submit" bsStyle="success" onClick={() => this.handleSubmit(this.state.landmark)}>Publish</Button>
              <Button href="/" bsStyle="danger">Cancel</Button>
            </ButtonToolbar>
          </Col>
          <Col sm={4}>
          </Col>
        </Row>
      </Grid>
    );
  }
}
/** ============================================================
 * Define State Subscriptions
 * =============================================================
 */
const mapStateToProps = state => ({
  title: state.newpost.title,
  content: state.newpost.content,
  location: state.newpost.location,
  map: state.map.center,
  user: state.user,
  stories: state.newpost.allUserStories,
  storyTitle: state.newstory.storyTitle,
  storySummary: state.newstory.storySummary
});

/** ============================================================
 * Define Dispatches Subscriptions
 * =============================================================
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  handleTitleInput: handleTitleInput,
  handleContentTextArea: handleContentTextArea,
  handleLocationInput: handleLocationInput,
  handleStoryLoad: handleStoryLoad,
  handleStoryTitle: handleStoryTitle,
  handleStorySummary: handleStorySummary,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewPost);