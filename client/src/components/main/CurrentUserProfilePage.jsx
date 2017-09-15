import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profile from '../../styles/profile';
import PostList from './PostList.jsx';
import CurrentUserPostList from './profile/CurrentUserPostList.jsx';
import Timeline from './Timeline.jsx';

/** ============================================================
 * Import Semantic UI Components
 * ============================================================= */
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
 * ============================================================= */
import { getPostsByUserId } from '../../store/modules/posts';
import { getAllFollowings } from '../../store/modules/following';

/** ============================================================
 * Define Component
 * ============================================================= */
class CurrentUserProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllFollowings(this.props.user.id);
    this.props.getPostsByUserId(this.props.user.id);
  }

  render () {
    if (!this.props.followings) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      );
    } else {
      return (
      <Container>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Segment><CurrentUserPostList/></Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>Content</Segment>
          </Grid.Column>
        </Grid>
      </Container>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  followings: state.following.followings,
  posts: state.posts.currentUserPosts
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPostsByUserId,
  getAllFollowings
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentUserProfilePage);


// <div style={profile.container}>
//           <div style={profile.container.header}/>
//           <Row>
//             <Col sm={3} md={3}>
//               <div style={profile.container.bio}>
//                 <Image
//                   responsive
//                   style={profile.avatar}
//                   src={this.props.user.avatar || profile.defaultAvatar}
//                   alt={this.props.user.display}
//                 />
//                 <div style={profile.container.bio.contact}>
//                   <Glyphicon glyph="envelope" bsSize="small"/>{this.props.user.email}
//                 </div>
//                 <div>
//                   Following: <Link to={'/followings'}>{this.props.followings.length || 0 }</Link>
//                 </div>
//               </div>
//             </Col>
//             <Col sm={9} md={9} style={{padding: '0 2rem 0 0'}}>
//               <div style={profile.container.title}>
//                 {this.props.user.display}
//               </div>
//               <CurrentUserPostList/>
//               <div className="pull-right">
//                 <a href="#">Load more ...</a>
//               </div>
//             </Col>
//           </Row>
//         </div>