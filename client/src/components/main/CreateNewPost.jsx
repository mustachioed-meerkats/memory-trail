import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const CreateNewPost = ({ }) => ( 
  <div>
    <input placeholder="Title"/>
    <textarea placeholder="Title"></textarea>
  </div>
);

export default CreateNewPost;