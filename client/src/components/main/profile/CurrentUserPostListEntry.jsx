import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import getTimeSincePost from '../../../../lib/getTimeSincePost';

//TODO: Refactor into seperate style
const style = {
  card: {
    flex: '0 0 20%',
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

const CurrentUserPostListEntry = (props) => {
  return (
    <div style={style.card}>
      <div style={style.card.container}>
        <div style={style.card.title}>
          <Link to={`/post/${props.post.id}`}>{props.post.title}</Link>
        </div>
        <div style={style.card.stats}>
          Submitted {getTimeSincePost(props.post.created_at)} by <Link to={`/profile/${props.post.profile.id}`}> {props.post.profile.display}</Link></div>
        <div style={style.card.content}>{props.post.content.slice(0, 64) + ' ...'}</div>
        <Button style={style.card.button}><Glyphicon glyph="bookmark" /></Button>
      </div>
    </div>
  );
};

export default CurrentUserPostListEntry;