import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CurrentUserPostListEntry from './CurrentUserPostListEntry.jsx';
import { Container } from 'semantic-ui-react';


const CurrentUserPostList = (props) => {
  var posts = props.isCurrentUser ? props.userPosts : props.otherUserPosts;
  if (!posts) {
    return (
      <div>
        Loading
      </div>
    );
  } else if (posts) {
    return (
      <Container text>
        {posts.sort((a, b) => { return a.created_at - b.created_at; }).map((post, i) => {
          return <CurrentUserPostListEntry post={post} id={i} key={i} />;
        })}
      </Container>
    );
  }
};

const mapStateToProps = (state) => ({
  userPosts: state.user.posts,
  otherUserPosts: state.otherUser.posts
});

export default connect(
  mapStateToProps
)(CurrentUserPostList);