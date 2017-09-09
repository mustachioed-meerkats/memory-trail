import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autocomplete from 'react-google-autocomplete';

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
  constructor (props) {
    super (props);
    this.state = {
      show: false,
    };
    const geocodeLocationInput = (location) => {
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
    const initializeAutocomplete = () => {
      let input = document.getElementById('locationInput');
      // render predictions from google autocomplete using input from location field
      let autocomplete = new google.maps.places.Autocomplete(input);
      let place;
      // listen for location selection from the dropdown
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        place = autocomplete.getPlace();
        // when a place is selected, use its address property to call google geocoding API
        geocodeLocationInput(place.formatted_address);
      });
    };

    const handleSubmit = () => {
      const post = {
        title: this.props.title,
        content: this.props.content,
        lat: this.props.location.lat,
        lng: this.props.location.lng,
        profile_id: this.props.user.id
      };

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
    };
  }

  render () {
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
          <Col sm={4}>
          </Col>
          <Col sm={4}>
            <ButtonToolbar style={{textAlign: 'center'}}>
              <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>Publish</Button>
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
