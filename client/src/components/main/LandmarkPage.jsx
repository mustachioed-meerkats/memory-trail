import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LandMarkPostList from './landmarks/LandMarkPostList.jsx';

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

    return (
      <Container>
        <Segment.Group>
          <Segment>
            <div style={style.card}>
              Welcome to <strong>{landmark.name}</strong>
            </div>
          </Segment>
          <LandMarkPostList landmark={landmark}/>
        </Segment.Group>
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