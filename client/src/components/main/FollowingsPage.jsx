import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import following from '../../styles/following';
import FollowingsPageList from './follow/FollowingsPageList.jsx';

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
import { getAllFollowings } from '../../store/modules/following';

/** ============================================================
 * Define Component
 * ========================================================== */
class FollowingsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllFollowings(this.props.user.id);
  }

  render() {
    return (
      <Grid columns={3} container doubling stackable>
        <Grid.Column>
          <FollowingsPageList />
        </Grid.Column>
      </Grid>
    );
  }
}

/** ============================================================
 * Define Class Properties
 * ========================================================== */
const mapStateToProps = (state) => ({
  user: state.user,
});

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllFollowings
}, dispatch);

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingsPage);