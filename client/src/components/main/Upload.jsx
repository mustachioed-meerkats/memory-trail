import React from'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Icon, Input } from 'semantic-ui-react';

import {
  handleImageUrl
} from '../../store/modules/newpost';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    axios.post('/upload', this.state.file)
      .then( res => {
        let image_url = res.data.Location;
        this.props.handleImageUrl(image_url);
        console.log('Upload successful');
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFile(e) {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    this.setState({
      file: formData
    })
  }

  render() {
    return (
      <div>
        <label htmlFor="hidden-new-file">
          <Icon name='photo' size='massive' color='teal' style={{cursor: 'pointer'}}/>
        </label>
        <input type='file' id="hidden-new-file" style={{display: 'none'}} onChange={this.handleFile}/>
        <Button size='small' onClick={this.handleSubmit}>Upload</Button>
      </div>
    );
  }
};

/** ============================================================
 * Define State Subscriptions
 * =============================================================
 */
const mapStateToProps = state => ({
  image_url: state.newpost.image_url
});

/** ============================================================
 * Define Dispatches Subscriptions
 * =============================================================
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  handleImageUrl: handleImageUrl
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
