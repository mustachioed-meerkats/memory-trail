import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import navbar from '../../styles/navbar';

/** ============================================================
 * Import Bootstrap UI Components
 * ========================================================== */
import { Modal } from 'react-bootstrap';

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
import { openSideBar, closeSideBar } from '../../store/modules/sidebar';

/** ============================================================
 * Define Component
 * ========================================================== */
class NavHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }
    
  render() {
    return (
      <Sidebar side='left' isVisible={ this.props.toggleSideBar} onHide={ () => this.props.closeSideBar() }>
        <Menu fluid vertical icon='labeled'>
          <Menu.Item as={Link} to='/' name='explore' onClick={this.handleItemClick}>
            <Icon name='map outline' />
            Explore
          </Menu.Item>
          <Menu.Item as={Link} to='/post/new' name='newstory' onClick={this.handleItemClick}>
            <Icon name='pencil' />
            Write a Story
          </Menu.Item>
          <Menu.Item as={Link} to='/feed' name='feed' onClick={this.handleItemClick}>
            <Icon name='feed' />
            Feed
          </Menu.Item>
          <Menu.Item as={Link} to={`/profile/${this.props.user.id}`} name='profile' onClick={this.handleItemClick}>
            <Icon name='user circle outline' />
            {this.props.user.display}
          </Menu.Item>
          <Menu.Item as={Link} to='/testpage' name='test' onClick={this.handleItemClick}>
            TEST_PAGE
          </Menu.Item>
          <Menu.Item as={Link} to='/logout' name='logout' onClick={this.handleItemClick}>
            <Icon name='log out' />
            Logout
          </Menu.Item>
        </Menu>
      </Sidebar>
    );
  }
}

/** ============================================================
 * Define Component
 * ========================================================== */
class Sidebar extends React.Component {
  render() {
    return (
      <Modal 
        className='Sidebar left'
        show={ this.props.isVisible }
        onHide={this.props.onHide} 
        autoFocus keyboard
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Icon name='home' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.props.children }
        </Modal.Body>
      </Modal>
    );
  }
}

/** ============================================================
 * Define Class Properties
 * ========================================================== */
const mapStateToProps = (state) => ({
  user: state.user,
  toggleSideBar: state.sidebar.isVisible
});

/** ============================================================
 * Define Dispatches to Properties
 * ========================================================== */
const mapDispatchToProps = (dispatch) => bindActionCreators({
  openSideBar,
  closeSideBar
}, dispatch);

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader);