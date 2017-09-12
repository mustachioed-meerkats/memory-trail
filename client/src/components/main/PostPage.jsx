import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostListEntry from './PostListEntry.jsx';
import { Grid, Row, Col, Button, ButtonGroup, ListGroupItem, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

import getTimeSincePost from '../../../lib/getTimeSincePost';

const PostPage = (props) => {

  // TODO: Refactor into Styles
  const style = {
    card: {
      boxShadow: '0 1px 2px #aaa',
      background: 'white',
      margin: '0 1rem 1rem',
      borderRadius: '3px',
      paddingBottom: '3em',
      container: {
        padding: '1.5rem',
      },
      title: {
        fontSize: '2rem',
        fontWeight: 200
      },
      content: {
        fontSize: '1.25rem',
        lineHeight: 2.5,
        color: 'gray',
        fontWeight: 400
      },
      stats: {
        fontSize: '.9rem',
        lineHeight: 2.5,
        color: 'gray',
        fontWeight: 400
      },
      button: {
        float: 'right',
        overflow: 'hidden',
        borderWidth: '0',
        outline: 'none',
        borderRadius: '2px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
        backgroundColor: 'white',
        color: 'gray',
        transition: 'background-color .3s',
      },
      header: {
        position: 'relative',
        zIndex: '0',
        top: 0, left: 0, right: 0,
        height: '10rem',
        transition: 'transform .5s, opacity .3s',
        background: 'url(http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-san-francisco.jpg?itok=MdRJm2Zo)  center center',
        backgroundSize: 'cover',
      }
    }
  };

  const currentPost = props.posts.filter((post) => { return post.id === parseInt(props.match.params.id); })[0];

  return (
    <Row>
      <Col md={3}/>
      <Col md={5}>
        <div style={style.card}>
          <div style={style.card.header}></div>
          <div style={style.card.container}>
            <div style={style.card.title}>
              <Link to={`/post/${currentPost.profile_id}`}>{currentPost.title}</Link>
            </div>
            <div style={style.card.stats}>
              Submitted {getTimeSincePost(currentPost.created_at)} by <Link to={`/profile/${currentPost.profile_id}`}> {currentPost.profile_display}</Link>
            </div>
            <div style={style.card.content}>{currentPost.content}</div>
            <Button style={style.card.button}><Glyphicon glyph="bookmark" /></Button>
          </div>
        </div>
      </Col>
      <Col md={3}/>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  //should perhaps get all posts instead of posts on map
  posts: state.map.markers
});

export default connect(
  mapStateToProps
)(PostPage);