import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LandmarkPostList from './landmarks/LandmarkPostList.jsx';

/** ============================================================
 * Import Semantic UI Components
 * ========================================================== */
import { Container, Grid, Segment } from 'semantic-ui-react';

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
    const landmarkTitle = {
      padding: '12.5rem 0rem 0rem 0rem', 
      textAlign: 'center',
      fontSize: '3rem'
    };
    const guestBook = [... new Set(landmark.posts.map((post) => { return post.profile_display; }))];
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <div style={style.card}>
              <div className='landmark-page-title'><strong>{landmark.name}</strong></div>
            </div>
          </Segment>
        </Segment.Group>
        <Grid columns={2} stackable>
          <Grid.Column width={6}>
            <Segment>
              <div className='panel-title'>
                <strong>Landmark Information:</strong>
              </div>
              <div>
                {landmark.posts.length} Memories at this landmark!
              </div>
            </Segment>
            <Segment>
              <div className='panel-title'>
                <strong>Guest Book:</strong>
              </div>
              <div>
                {guestBook.join(', ')}
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <LandmarkPostList landmark={landmark}/>
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