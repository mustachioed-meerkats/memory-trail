import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../../../styles/following.js';
import getTimeSincePost from '../../../../lib/getTimeSincePost';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import {
  Button, 
  Container,
  Grid, 
  Header, 
  Icon,
  Image, 
  Item, 
  Label, 
  Menu, 
  Segment, 
  Step,
  Table,
  Card,
  Dimmer,
  Loader,
  Comment,
  Form
} from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
const FollowingFeedListEntry = ({post}) => {

  post.user = {
    avatar: 'https://avatars0.githubusercontent.com/u/11849230?v=4&s=60'
  };
  post.image = 'http://www.quotemaster.org/images/1b/1b652896515238ec56fb6a38e58c9baa.jpg';

  let postContent = '';
  if (post.content.length > 255) {
    postContent = post.content.slice(0, 255) + ' ...';
  } else {
    postContent = post.content;
  }

  const hmm = {
    card: {
      margin: '-1rem -1rem 0.5rem -1rem',
      height: '400px',
      background: 'url(http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-san-francisco.jpg?itok=MdRJm2Zo)  center center',
      backgroundSize: 'cover'
    }
  };

  return (
    <Card fluid raised={true}> 
      <Card.Content>
        <div style={hmm.card}>
        </div >
        <Card.Meta>
          <div>
            <a><Icon name='heart' /> # Likes</a>
            <a><Icon name='map pin' /> LAND_MARK</a>
          </div>
          Submitted {getTimeSincePost(post.created_at)} by <strong>{post.profile_display}</strong>
        </Card.Meta>
        <Card.Description>
          {post.content.slice(0, 64) + ' ...'}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          color='red'
          content=''
          icon='heart'
          label={{ basic: true, color: 'red', pointing: 'left', content: '###' }}
        />
        <Button circular icon='commenting outline' />
        <Button circular icon='share alternate' />
      </Card.Content>
      <Card.Content extra>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={'https://avatars0.githubusercontent.com/u/11849230?v=4&s=60'} />
            <Comment.Content>
              <Comment.Author as='a'>{'Dylan Baker'}</Comment.Author>
              <Comment.Actions>
                <Comment.Action>Submitted {getTimeSincePost('2017-09-14T18:44:52.303Z')}</Comment.Action>
              </Comment.Actions>
              <Comment.Text>
                {'COMMENT_CONTENT'}
              </Comment.Text>
            </Comment.Content>
          </Comment>
          <Form reply>
            <Form.Input />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
      </Card.Content>
    </Card>
  );
};

export default FollowingFeedListEntry;