import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

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
} from '../../store/modules/posts';

const CreateNewPost = (props) => {

  const getLocation = () => {
    return navigator.geolocation.getCurrentPosition(function(location) {
      var lat = location.coords.latitude;
      var lng = location.coords.longitude;
      return {lat: lat, lng: lng};
    });
  };

  const handleSubmit = () => {
    const post = {
      title: props.title,
      content: props.content,
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
              {/* <FormControl
                type="text" 
                onChange={(e) => { props.handleLocationInput(e.target.value); }}
                placeholder="Location"
              /> */}
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
        <Col smOffset={2} sm={1}>
          <ButtonToolbar>
            <Button type="submit" bsStyle="success" onClick={handleSubmit}>Publish</Button>
            <Button href="/" bsStyle="danger">Cancel</Button>
          </ButtonToolbar>
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
  title: state.posts.newPost.title,
  content: state.posts.newPost.content,
  location: state.posts.newPost.location
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