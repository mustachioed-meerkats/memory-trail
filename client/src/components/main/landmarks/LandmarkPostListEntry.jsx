import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getTimeSincePost from '../../../../lib/getTimeSincePost';
import LandmarkPostModal from './LandMarkPostModal.jsx';

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
  Loader,
  Modal
} from 'semantic-ui-react';

/** ============================================================
 * Define Component
 * ========================================================== */
class LandmarkPostListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  closeModal() {
    this.setState({ 
      showModal: false 
    });
  }

  openModal() {
    this.setState({ 
      showModal: true 
    });
  }
  render () {
    const landMarkImage = this.props.post.image_url || 'https://i.imgur.com/a53MMcb.jpg';
    const style = {
      card: {
        margin: '-1rem -1rem 0.5rem -1rem',
        height: '5rem',
        background: `url(${landMarkImage})  center center`,
        backgroundSize: 'cover'
      }
    };

    return (
      <div>
        <Card fluid raised={true}> 
          <Card.Content>
            <div style={style.card} onClick={this.openModal.bind(this)}>
            </div>
            <Card.Meta>
              Submitted {getTimeSincePost(this.props.post.created_at)} by <Link to={`/profile/${this.props.post.profile_id}`}><strong>{this.props.post.profile_display}</strong></Link>
            </Card.Meta>
            <Card.Description>
              {this.props.post.content}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button icon='heart'/>
            <Button circular icon='commenting outline' />
            <Button circular icon='share alternate' />
          </Card.Content>
        </Card>
        <LandmarkPostModal
          landmark={this.props.landmark}
          post={this.props.post} 
          showModal={this.state.showModal} 
          openModal={this.openModal.bind(this)}
          closeModal={this.closeModal.bind(this)}
        />
      </div>
    );
  }
}
export default LandmarkPostListEntry;