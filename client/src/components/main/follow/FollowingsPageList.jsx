import React from 'react';
import { connect } from 'react-redux';
import FollowingsPageListEntry from './FollowingsPageListEntry.jsx';

const FollowingsPageList = (props) => {
  if (!props.followings) {
    return (
      <div>Loading</div>
    );
  } else if (props.followings.length === 0) {
    return (
      <div>Hey {props.user.display}! It looks like you aren't following anyone</div>
    );
  } else {
    return (
      <div>
        {props.followings.map((following, i) => {
          return <FollowingsPageListEntry following={following} id={i} key={i} />;
        })}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  followings: state.following.followings
});

export default connect(
  mapStateToProps
)(FollowingsPageList);