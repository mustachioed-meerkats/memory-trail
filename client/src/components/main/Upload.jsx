import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Icon, Input, Image, Message, Segment, Popup } from 'semantic-ui-react';

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

let timeout = 3000;

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      previewImage: null,
      imageStatus: false,
      messageOpen: false
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openMessage = this.openMessage.bind(this);
  }

  handleSubmit(e) {
    axios.post('/upload', this.state.file)
      .then( res => {
        let image_url = res.data.Location;
        this.props.handleImageUrl(image_url);
        this.setState({imageStatus: 'uploaded', previewImage: null});
        this.openMessage();
      })
      .catch(err => {
        console.log('failed', err);
        this.setState({imageStatus: 'failed'});
        this.openMessage();
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
      this.openMessage();
    }.bind(this);

  }


  openMessage () {
    this.setState({ messageOpen: true });

    this.timeout = setTimeout(() => {
      this.setState({ messageOpen: false });
    }, timeout);
  }

  render() {
    /*
    Conditional renders for user feedback with regards to the status of their image.

    */
    let previewMessage = null;
    let previewImage = null;
    let buttonUpload = <Button size='small' onClick={this.handleSubmit}>Upload</Button>;

    if (this.state.imageStatus === true) {
      previewMessage = <Message positive >
      <Message.Header> Image Preview </Message.Header>
      </Message>;
    }

    if (this.state.imageStatus === 'failed' && this.state.messageOpen === true) {
      previewMessage = <Message negative >
      <Message.Header> Uh Oh... Upload Failed </Message.Header>
      <p> Please try again, or refresh the page. </p>
      </Message>;
    }

    if (this.state.imageStatus === 'uploaded' && this.state.messageOpen === true) {
      previewMessage = <Message positive>
        <Message.Header> Image Uploaded! </Message.Header>
        </Message>;
    }

    if (this.state.previewImage !== null) {
      previewImage = <Image src={this.state.previewImage} fluid />;
    } else {
      buttonUpload =
        <Popup
          trigger={<Button size='small'>Upload</Button>}
          content={<p>Select an image first by hitting that camera button!!</p>}
          on='click'
          position='bottom left'
        />;
    }

    if (this.state.previewImage !== null) {
      previewImage = <Image src={this.state.previewImage} fluid />;
    }

    return (
      <div >
        <label htmlFor="hidden-new-file">
          <Icon name='photo' size='massive' style={{cursor: 'pointer', color: 'white'}}/>
        </label>
        <input ref='file' type='file' id="hidden-new-file" style={{display: 'none'}} onChange={this.handleFile}/>
        {buttonUpload}
        <div style={divStyle} >
          {previewMessage}
          {previewImage}
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
