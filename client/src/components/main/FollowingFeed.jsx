import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import following from '../../styles/following';
import { Link } from 'react-router-dom';
import FollowingFeedList from './follow/FollowingFeedList.jsx';
import { Grid, Row, Col } from 'react-bootstrap';

/** ============================================================
 * Import Redux Action Creators
 * ============================================================= */
import { getPostsByFollowings } from '../../store/modules/following';

class FollowingFeed extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getPostsByFollowings(this.props.user.id);
  }

  render () {
    return (
      <div style={following.container}>
        <div style={following.container.header}>
          <div style={following.container.header.title}>Memory Feed</div>
        </div>
          <div style={following.container.feed}>
            <Link to={'/followings'}>View Followings</Link>
            <FollowingFeedList />
          </div>
      </div>  
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPostsByFollowings
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingFeed);