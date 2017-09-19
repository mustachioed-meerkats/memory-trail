import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LandmarkPostList from './landmarks/LandmarkPostList.jsx';

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

/** ============================================================
 * Define Component
 * ========================================================== */
class LandmarkPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const landmark = this.props.landmarks.filter((landmark) => { 
      return landmark.id === parseInt(this.props.match.params.id); 
    })[0];

    const style = {
      card: {
        margin: '-1rem -1rem -1rem -1rem',
        height: '25rem',
        background: `url(${landmark.image_url})  center center`,
        backgroundSize: 'cover',
        color: 'white'
      }
    };
    const guestBook = [... new Set(landmark.posts.map((post) => { return post.profile_display; }))];
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <div style={style.card}>
              <div>Welcome to <strong>{landmark.name}</strong></div>
            </div>
          </Segment>
        </Segment.Group>
        <Grid columns={2} stackable>
          <Grid.Column width={6}>
            <Segment>
              <div>
                <strong>Landmark Information:</strong>
              </div>
              <div>
                {landmark.posts.length} Memories at this landmark!
              </div>
            </Segment>
            <Segment>
              <div>
                <strong>Guest Book:</strong>
              </div>
              <div>
                {guestBook.join(', ')}
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <LandMarkPostList landmark={landmark}/>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** ============================================================
 * Define Class Properties
 * ========================================================== */
const mapStateToProps = (state) => ({
  landmarks: state.map.landmarks,
});

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */
export default connect(
  mapStateToProps
)(LandmarkPage);