import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Image, well} from 'react-bootstrap';

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const LoginCard = () => {
  return (
    <div className="well" style={wellStyles}>
      <a href="/api/auth/google" ><Image src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" /></a>
    </div>
  );
};

export default LoginCard;