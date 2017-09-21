import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
class NavSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  
  render() {

    return (
      <SidebarModal side='left' isVisible={ this.props.toggleSideBar} onHide={ () => this.props.closeSideBar() }>
        <Menu fluid vertical icon='labeled'>
          <Menu.Item as={Link} to={`/profile/${this.props.user.user.id}`} name='profile' onClick={() => this.props.closeSideBar()}>
            <Icon name='user circle outline' />
            {this.props.user.user.display}
          </Menu.Item>
          <Menu.Item as={Link} to='/' name='newstory' onClick={() => this.props.closeSideBar()}>
            <Icon name='pencil' />
            Record a Memory
          </Menu.Item>
          <Menu.Item as={Link} to='/explore' name='explore' onClick={() => this.props.closeSideBar()}>
            <Icon name='map outline' />
            Explore
          </Menu.Item>
          <Menu.Item as={Link} to='/feed' name='feed' onClick={() => this.props.closeSideBar()}>
            <Icon name='feed' />
            Feed
          </Menu.Item>
          <Menu.Item link href='/logout' name='logout' onClick={() => this.props.closeSideBar()}>
            <Icon name='log out' />
            Logout
          </Menu.Item>
        </Menu>
      </SidebarModal>
    );
  }
}

/** ============================================================
 * Define Component
 * ========================================================== */
class SidebarModal extends React.Component {
  render() {
    return (
      <Modal 
        className='Sidebar left'
        show={ this.props.isVisible }
        onHide={this.props.onHide} 
        autoFocus keyboard
        style={{outlineWidth: '0px'}}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Memory Trail</strong>
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
)(NavSideBar);