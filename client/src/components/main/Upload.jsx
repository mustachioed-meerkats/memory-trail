import React from'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class Upload extends React.Component {

  onDrop = (files) => {
    let file = files[0];
    console.log(files);
    axios.post('/upload', {
      filename: file.name,
      filetype: file.type
    })
  .then((result) => {
    console.log('result from upload controller: ', result)
    let signedUrl = result.data;
    let options = {
      headers: {
        'Content-Type': file.type
      }
    };
    return axios.put(signedUrl, file, options);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
  };

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} multiple={false}>
          <div>Try dropping a file here, or click to select a file to upload.</div>
        </Dropzone>
      </div>
    );
  }
};

export default Upload;