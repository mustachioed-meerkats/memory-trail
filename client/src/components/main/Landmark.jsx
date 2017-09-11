import React from'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, Radio, ButtonGroup } from 'react-bootstrap';
import following from '../../styles/following';

// populate the page with landmarks data
class Landmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landmark: '',
      landmark_id: parseInt(props.match.params.id),
      posts: ''
    }
  }

  componentWillMount = () => {
    
    axios.get(`api/posts/landmark/${this.state.landmark_id}`)
    .then((res) => {

      // get back all the posts associated with this landmark id
      console.log('the posts for this landmark: ', res);
      this.setState({
        posts: res.data
      })
    })
    .catch((err) => {
      console.log('error retrieving posts for this landmark', err);
    })

    axios.get(`api/landmarks/${this.state.landmark_id}`)
    .then((res) => {
      // get back the landmark object associated with this landmark id
      console.log('this is the information about this landmark: ', res);
      this.setState({
        landmark: res.data
      })
    })
    .catch((err) => {
      console.log('error retrieving landmark data for this id', err);
    })
  }

  render() {
    return (
      <div> Landmark Name </div>
    )
  }
}

export default Landmark;

