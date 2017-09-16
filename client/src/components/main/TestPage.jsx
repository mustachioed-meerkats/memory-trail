import React from 'react';
import {withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import Markers from './maps/Markers.jsx';
// import PostList from './PostList.jsx';

/** ============================================================
 * Import Semantic UI Components
 * =============================================================
 */
import {
  Button,
  Card,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  List,
  Menu,
  Message,
  Segment,
  Table,
  TextArea,
  Transition
} from 'semantic-ui-react';

/** ============================================================
 * Import Redux Action Creators
 * ========================================================== */
import {
  handleMapMounted, 
  handleSearchBoxMounted,
  handlePlacesChanged,
  handleBoundsChanged,
  handleSearchArea,
  handleMarkerClick,
  handleMarkerClose
} from '../../store/modules/map';

class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userStories: [],
      currentStory: '',
      currentStoryPosts: [],
      currentStoryMarkers: [],
      currentPost: ''
    }
  }

            // <GoogleMap
            //   ref={this.props.handleMapMounted}
            //   defaultZoom={14}
            //   center={{37.773972, -122.431297}}
            // />

  render() {
    return (
      <Container>
        <Grid fluid={true} centered columns={2}>
          <Grid.Column>
            <Card />
          </Grid.Column>
          <Grid.Column>
            <Card />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}




/** ============================================================
 * Define State Subscriptions
 * =============================================================
 */
const mapStateToProps = state => ({

});

/** ============================================================
 * Define Dispatches Subscriptions
 * =============================================================
 */
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

