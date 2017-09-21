import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LandmarkPostListEntry from './LandmarkPostListEntry.jsx';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Dimmer, Loader } from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
const LandmarkPostList = (props) => {
  if (!props.landmark) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  } else {
    return (
      <div>
        {props.landmark.posts.sort((a, b) => { return a.created_at - b.created_at; }).map((post, i) => {
          return <LandmarkPostListEntry post={post} id={i} landmark={props.landmark} key={i} />;
        })}
      </div>
    );
  }
};

export default LandmarkPostList;