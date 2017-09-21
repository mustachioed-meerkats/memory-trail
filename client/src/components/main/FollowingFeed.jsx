import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import following from '../../styles/following';
import { Link } from 'react-router-dom';
import FollowingFeedList from './follow/FollowingFeedList.jsx';

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
  Step,
  Table,
  Card,
  Dimmer,
  Loader
} from 'semantic-ui-react';

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */
import { getPostsByFollowings } from '../../store/modules/following';
import { openSideBar } from '../../store/modules/sidebar';

/** ============================================================
 * Define Component
 * ========================================================== */
class FollowingFeed extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getPostsByFollowings(this.props.user.user.id);
  }

  render () {
    const listNav = {
      position: 'fixed',
      padding: '1rem',
      top: 0
    };

    return (
      <Container>
        <Segment.Group>
          <Segment>Memory Feed</Segment>
        </Segment.Group>
        <FollowingFeedList />
      </Container>
    );
  }
}

/** ============================================================
 * Define Redux State to Properties
 * ========================================================== */
const mapStateToProps = (state) => ({
  user: state.user,
});

/** ============================================================
 * Define Dispatches to Properties
 * ========================================================== */
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPostsByFollowings,
  openSideBar
}, dispatch);

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingFeed);