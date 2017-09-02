import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

// TODO: Breakout into custom CSS

const footerStyle = {
  position: 'fixed',
  height: '50px',
  bottom: '0px',
  left: '0px',
  right: '0px',
  margin: '0px 0px 0px 0px'
};

export default () => (
  <div style={footerStyle}>
    <Grid>
      <Row className="show-grid">
        <Col xs={6} md={4}>Footer Left</Col>
        <Col xs={6} md={4}>Footer Center</Col>
        <Col xs={6} md={4}>Footer Right</Col>
      </Row>
    </Grid>
  </div>
);
