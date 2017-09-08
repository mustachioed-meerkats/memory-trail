import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PhotoPost from './PhotoPost.jsx'

const PhotoPostList = (props) => {
  return (
    <div style = {{display:'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-evenly', overflowX: 'scroll'}}>     
      {props.posts.map((post, i) => { 
        return  <PhotoPost post={post} id={i} key={i} />; 
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.map.posts
});


export default connect(
  mapStateToProps
)(PhotoPostList);