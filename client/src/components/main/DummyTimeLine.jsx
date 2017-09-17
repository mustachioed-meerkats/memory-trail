import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const DummyTimeLine = (props) => {
  var stories = props.isCurrentUser ? props.user : props.otherUser;
  return (
    <div>Story Map</div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  otherUser: state.otherUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DummyTimeLine);