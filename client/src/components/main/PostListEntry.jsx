import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, ButtonGroup, ListGroupItem, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

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

const getTimeSincePost = (postTime) => {
  let postDateMilliseconds = new Date(postTime).getTime();
  let currentDateMilliseconds = new Date().getTime();

  let diff = Math.abs(currentDateMilliseconds - postDateMilliseconds);
  let seconds = (diff / 1000).toFixed(0);

  if (seconds < 60) {
    return seconds + ' seconds ago ';
  } else {
    let minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + ' minutes ago ';
    } else {
      let hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return hours + ' hours ago';
      } else {
        let days = Math.floor(hours / 24);
        return days + ' days ago ';
      }
    }
  }
  return 0;
};

const PostListEntry = (props) => {
  return (
    // <Row>
    //   <Col md={3}/>
    //   <Col md={5}>
    <div style={style.card}>
      <div style={style.card.container}>
        <div style={style.card.title}>
          <Link to={`/post/${props.post.id}`}>{props.post.title}</Link>
        </div>
        <div style={style.card.stats}>Submitted {getTimeSincePost(props.post.created_at)} by {props.post.profile_id}</div>
        <div style={style.card.content}>{props.post.content.slice(0, 64) + ' ...'}</div>
        <Button style={style.card.button}><Glyphicon glyph="bookmark" /></Button>
      </div>
    </div>
    //   </Col>
    //   <Col md={3}/>
    // </Row>
  );
};

export default PostListEntry;