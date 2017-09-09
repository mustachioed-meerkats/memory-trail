import React from'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import { Button, ButtonToolbar, ControlLabel, Form, FormGroup, FormControl, Radio, ButtonGroup } from 'react-bootstrap';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      processing: false
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      processing: true
    });

    axios.post('/upload', this.state.file)
      .then( res => {
        this.setState({
          processing: false
        });
        console.log('Upload successful');
      })
      .catch(err => {
        this.setState({
          processing: false
        });
        console.log(err);
      });
  }

  handleFile(e) {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    this.setState({
      file: formData
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <Row>
              <Col sm={4}>
              </Col>
              <Col sm={2}>
                <label>Upload Image</label>
              </Col>
              <Col sm={3}>
                {this.state.processing ? <input disabled className='btn btn-primary' type="submit" value="Upload" /> : <input className='btn btn-primary' type="submit" value="Upload" />}
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
              </Col>
              <Col sm={4}>
                <input type="file" onChange={this.handleFile} />
              </Col>
              <Col sm={4}>
              </Col>
            </Row>
          </form>
        </Row>
      </Grid>
    );
  }
};

export default Upload;

{/* <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            {this.state.processing ? <input disabled className='btn btn-primary' type="submit" value="Upload" /> : <input className='btn btn-primary' type="submit" value="Upload" />}
          </form> */}