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



const CreateNewPost = (props) => {


  const geocodeLocationInput = (location) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDXLOMgs19AOUHeizaMnRwjVyzxcTGWmJ8`
    return axios.get(url)
    .then((res) => {
      console.log('response from geocoding API: ', res);
      props.handleLocationInput(res.data.results[0].geometry.location);
    })
    .catch((err) => {
      console.log('(Client) Error calling Google Geocoding API');
    });
  }

  // Autocomplete feature for the form's location input field
  const initLocationAutocomplete = () => {
    let input = document.getElementById('locationInput');    
    let autocomplete = new google.maps.places.Autocomplete(input);
    let place;
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      place = autocomplete.getPlace();
      geocodeLocationInput(place.formatted_address);
    });
  }

  const handleSubmit = () => {
    const post = {
      title: props.title,
      content: props.content,
      lat: props.location.lat,
      lng: props.location.lng,
      profile_id: props.user.id
    };

    console.log('(Client) Intiating POST Request! CREATING NEW POST');
    console.log(post);
    return axios.post('/api/posts/new', post)
      .then(result => {
        console.log('(Client) Success! CREATING NEW POST');
        // TODO: Add redirection to Explore Map
      })
      .then()
      .catch((err) => {
        console.log('(Client) Error! CREATING NEW POST');
        console.log(err);
      });
  };

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
                onChange={(e) => { props.handleTitleInput(e.target.value); }}
                placeholder="Title"
              />
            </FormGroup>
            <FormGroup>
              <Autocomplete
                className="form-control"
                id="locationInput"
                placeholder="Search for places"
                style={{width: '100%'}}
                onChange={initLocationAutocomplete}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                componentClass="textarea"
                onChange={(e) => { props.handleContentTextArea(e.target.value); }}
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
            <Button type="submit" bsStyle="success" onClick={handleSubmit}>Publish</Button>
            <Button href="/" bsStyle="danger">Cancel</Button>
          </ButtonToolbar>
        </Col>
        <Col sm={4}>
        </Col>
      </Row>
    </Grid>
  );
};

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