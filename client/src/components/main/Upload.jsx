import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Icon, Input, Image, Message } from 'semantic-ui-react';

import {
  handleImageUrl
} from '../../store/modules/newpost';

const divStyle = {
  display: 'block',
  height: 'auto',
  width: 'auto',
  maxHeight: '35rem',
  maxWidth: '35rem'

};

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      previewImage: null,
      imageStatus: false
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    axios.post('/upload', this.state.file)
      .then( res => {
        let image_url = res.data.Location;
        this.props.handleImageUrl(image_url);
        this.setState({imageStatus: 'uploaded'});
      })
      .catch(err => {
        console.log('failed', err);
        this.setState({imageStatus: 'failed'});
      });
  }

  handleFile(e) {
    this.imagePreview();
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    this.setState({
      file: formData
    });
  }

  imagePreview() {
    let file = this.refs.file.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({
        previewImage: reader.result,
        imageStatus: true,
      });
    }.bind(this);

  }

  render() {
    let preview = null;
    if (this.state.imageStatus === false) {
      preview = null;
    }
    if (this.state.imageStatus === true) {
      preview = <Message positive>
      <Message.Header> Image Preview </Message.Header>
      </Message>;
    }

    if (this.state.imageStatus === 'failed') {
      preview = <Message negative> 
      <Message.Header> Uh Oh... Upload Failed </Message.Header>
      <p> Please try again, or refresh the page. </p>
      </Message>;
    }

    if (this.state.imageStatus === 'uploaded') {
      preview = <Message positive> 
        <Message.Header> Image Uploaded! </Message.Header>
        </Message>; 
    }
    
    return (
      <div>
        <label htmlFor="hidden-new-file">
          <Icon name='photo' size='massive' color='teal' style={{cursor: 'pointer'}}/>
        </label>
        <input ref='file' type='file' id="hidden-new-file" style={{display: 'none'}} onChange={this.handleFile}/>
        <Button size='small' onClick={this.handleSubmit}>Upload</Button>
        <div style={divStyle} >
          {preview}
        <Image src={this.state.previewImage} fluid />
      </div>
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
