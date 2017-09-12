import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CurrentUserPostListEntry from './CurrentUserPostListEntry.jsx';

const CurrentUserPostList = (props) => {
  if (!props.posts) {
    return (
      <div>
        Loading
      </div>
    );
  } else if (props.posts) {
    return (
      <div>
        {props.posts.map((post, i) => { 
          return <CurrentUserPostListEntry post={post} id={i} key={i} />; 
        })}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  posts: state.posts.currentUserPosts
});

export default connect(
  mapStateToProps
)(CurrentUserPostList);