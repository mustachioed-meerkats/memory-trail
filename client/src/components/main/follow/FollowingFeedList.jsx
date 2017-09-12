import React from 'react';
import { connect } from 'react-redux';
import FollowingFeedListEntry from './FollowingFeedListEntry.jsx';

const FollowingFeedList = (props) => {
  if (!props.posts) {
    return (
      <div>Loading</div>
    );
  } else {
    return (
      <div>
        {props.posts.map((post, i) => {
          return <FollowingFeedListEntry post={post} id={i} key={i} />;
        })}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  posts: state.following.posts
});

export default connect(
  mapStateToProps
)(FollowingFeedList);