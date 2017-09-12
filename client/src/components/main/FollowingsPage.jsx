import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, Image, Glyphicon } from 'react-bootstrap';
import following from '../../styles/following';

import FollowingsPageList from './follow/FollowingsPageList.jsx';

/** ============================================================
 * Import Redux Action Creators
 * ============================================================= */
import { getAllFollowings } from '../../store/modules/following';

/** ============================================================
 * Define Component
 * ============================================================= */
class FollowingsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllFollowings(this.props.user.id);
  }

  render() {
    return(
      <div style={following.container}>
        <div style={following.container.header}>
          <div style={following.container.header.title}>Memory Feed</div>
        </div>
          <div style={following.container.feed}>
            <FollowingsPageList />
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllFollowings
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingsPage);