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
  constructor (props) {
    super (props);
    this.state = {
      show: false,
      storyID: ''
    };
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
      // when a place is selected, use its address property to call google geocoding API
      this.geocodeLocationInput(place.formatted_address);
    });
  }

  handleSubmit () {
    console.log('submitting');
    const post = {
      title: this.props.title,
      content: this.props.content,
      lat: this.props.location.lat,
      lng: this.props.location.lng,
      profile_id: this.props.user.id,
      storyID: props.storyID
    };
    console.log(post);

    console.log('(Client) Intiating POST Request! CREATING NEW POST');
    console.log(post);
    return axios.post('/api/posts/new', post)
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
    };
    return axios.post('/api/story/new', storyInfo)
      .then(result => {
        console.log('STORY CREATED');
      })
      .catch((err) => {
        console.log('STORY CREATION FAILED');
      });
  }

  storySelected (name) {
    this.props.stories.map(function (story) {
      if (story.title === name) {
        this.setState({storyID: story.id});
      }
    });
  }

  showModal () {
    console.log('WORKING');
    this.setState({show: true});
  }

  hideModal () {
    this.setState({show: false});
  }

  componentDidMount() {
    this.props.handleStoryLoad();
  }

  render () {
    console.log(this.props.allUserStories);
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
                {...this.props}
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
                  <Button onClick={this.hideModal.bind(this)} onClick= {this.storySubmit.bind(this)} > Submit Story </Button>
                </Modal.Footer>
              </Modal>
            </ButtonToolbar>
            <ButtonToolbar>
              <DropdownButton bsSize="large" title="Choose A Story!!" id="dropdown-size-large" onSelect = {(e) => { this.storySelected(e.target.value); }} >
                {this.props.stories.map(function (story) {
                  return <MenuItem>{story.title}</MenuItem>;
                })}
              </DropdownButton>
            </ButtonToolbar>
            Current Story = whatever.
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
                  onChange={this.initializeAutocomplete.bind(this)}
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
          <Col sm={4}>
          </Col>
          <Col sm={4}>
            <ButtonToolbar style={{textAlign: 'center'}}>
              <Button type="submit" bsStyle="success" onClick={this.handleSubmit.bind(this)}>Publish</Button>
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
  storyTitle: state.storyTitle,
  storySummary: state.storySummary
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
