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
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, Radio, ButtonGroup } from 'react-bootstrap';

/** ============================================================
 * Define Store Modules
 * =============================================================
 */
import {
  handleTitleInput,
  handleContentTextArea,
  handleLocationInput
} from '../../store/modules/newpost';

class CreateNewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landmark: '',
      // postObject: ''
    }
    this.geocodeLocationInput = this.geocodeLocationInput.bind(this);
    this.initializeAutocomplete = this.initializeAutocomplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  geocodeLocationInput = (location) => {
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
  };

  // Autocomplete feature for the form's location input field
  initializeAutocomplete = () => {
    let input = document.getElementById('locationInput');
    // render predictions from google autocomplete using input from location field
    let autocomplete = new google.maps.places.Autocomplete(input);
    // listen for location selection from the dropdown
    let place;
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
  };

  handleSubmit = (landmark) => {
    let post = {
      title: this.props.title,
      content: this.props.content,
      lat: this.props.location.lat,
      lng: this.props.location.lng,
      profile_id: this.props.user.id,
      image_url: this.props.image_url,
      // landmark_id: landmark.id
    };

    console.log('(Client) Intiating POST Request! CREATING NEW POST');

    // this.setState({
    //   postObject: {
    //     post: post,
    //     landmark: this.state.landmark
    //   }
    // })
    var postObject = {
      post: post,
      landmark: this.state.landmark
    };
    console.log('postobject', postObject);
    return axios.post('/api/posts/new', postObject)
      .then(result => {
        console.log('(Client) Success! CREATING NEW POST');
        // TODO: Add redirection to Explore Map
      })
      .catch((err) => {
        console.log('(Client) Error! CREATING NEW POST');
        console.log(err);
      });
    };

  render() {
    return (
      <Grid>
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
  user: state.user
});

/** ============================================================
 * Define Dispatches Subscriptions
 * =============================================================
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  handleTitleInput: handleTitleInput,
  handleContentTextArea: handleContentTextArea,
  handleLocationInput: handleLocationInput
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewPost);
