
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, Image, Glyphicon } from 'react-bootstrap';
import profile from '../../styles/profile';
import PostList from './PostList.jsx';
import Timeline from './Timeline.jsx';

const UserProfilePage = (props) => {
  return (
    <div style={profile.container}>
      <div style={profile.container.header}/>
      <Row>
        <Col sm={3} md={3}>
          <div style={profile.container.bio}>
            <Image
              responsive
              style={profile.avatar}
              src={props.user.avatar || profile.defaultAvatar}
              alt={props.user.display}
            />
            <div style={profile.container.bio.contact}>
              <Glyphicon glyph="envelope" bsSize="small"/>{props.user.email}
            </div>
          </div>
        </Col>
        <Col sm={9} md={9} style={{padding: '0 2rem 0 0'}}>
          <div style={profile.container.title}>{props.user.display}</div>
          <PostList type={'TYPE_PROFILE'}/>
          <div className="pull-right">
            <a href="#">Load more ...</a>
          </div>
        </Col>
      </Row>
      <Row style={{height: '500px'}}>
        <Timeline />
      </Row>
      <PostList type={'TYPE_STORY'} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  userPosts: state.userPosts
});

export default connect(
  mapStateToProps
)(UserProfilePage);