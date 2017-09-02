import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import LoginCard from './LoginCard.jsx';

const Landing = () => {
  return (
    <div>
      <LoginCard />
    </div>
  );
};

export default Landing;