import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import getTimeSincePost from '../../../lib/getTimeSincePost';

import { Card, Icon, Image, Button } from 'semantic-ui-react';

//TODO: Refactor into seperate style
const style = {
  card: {
    width: '100%'
  },
  oldcard: {
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

const extra = (
  <div>
    <a><Icon name='heart' />13 </a>
    <a><Icon name='map pin' />Landmark</a>
  </div>
);

const hmm = {
  card: {
    margin: '-1rem -1rem 0.5rem -1rem',
    height: '5rem',
    background: 'url(http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-san-francisco.jpg?itok=MdRJm2Zo)  center center',
    backgroundSize: 'cover'
  }
};

const PostListEntry = (props) => {
  return (
    <Card raised={true}> 
      <Card.Content>
        <div style={hmm.card}>
        </div >
        <Card.Meta>
          <div>
            <a><Icon name='heart' /># </a>
            <a><Icon name='map pin' /> LAND_MARK</a>
          </div>
          Submitted {getTimeSincePost(props.post.created_at)} hrs ago by <strong>{props.post.profile_display}</strong>
        </Card.Meta>
        <Card.Description>
          {props.post.content.slice(0, 64) + ' ...'}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button circular icon='heart' />
        <Button circular icon='commenting outline' />
        <Button circular icon='share alternate' />
      </Card.Content>
    </Card>
  );
};

export default PostListEntry;