import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

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
  Divider
} from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
const InfoWindowContent = ({landmark}) => {
  const guestCount = [... new Set(landmark.posts.map((post) => { return post.profile_display; }))].length;
  const landmarkCount = landmark.posts.length;
  const mostRecentPost = landmark.posts.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  })[0];

  return (
    <div>
      <Link to={`/landmark/${landmark.id}`}>
        <strong><h4>{landmark.name}</h4></strong>
      </Link>
      <Divider />
      <div>
        {landmarkCount} memories shared by {guestCount} guests.
      </div>
      <Divider />
      <div>
        <div>
          {`"${mostRecentPost.content}"`}
        </div>
        <div>
          - <i>{mostRecentPost.profile_display}</i>
        </div>
      </div>
    </div>
  );
};

export default InfoWindowContent;