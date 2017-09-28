import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
class FixedNavMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getPostsByFollowings(this.props.user.user.id);
  }

  render () {
    const space = {
      padding: '2rem'
    };
    
    return (
      <div>
        <Menu size='tiny' fixed='top' className='fixed-nav-bar'>
          <Button
            size='tiny'
            style={{backgroundColor: 'white', paddingRight: '1rem'}}
            icon='sidebar'
            onClick={ () => this.props.openSideBar()}
          />
        </Menu>
        <div style={space}>
        </div>
      </div>
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
)(FixedNavMenu);