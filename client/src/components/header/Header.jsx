import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavSideBar from './NavSideBar.jsx';
import FixedNavMenu from './FixedNavMenu.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <NavSideBar />
        {this.props.location.pathname === '/explore' ? '' : <FixedNavMenu/>}
      </div>
    );
  }
}

/** ============================================================
 * Define Class Properties
 * ========================================================== */
const mapStateToProps = (state) => ({
  location: state.routing.location
});

/** ============================================================
 * Define Redux Store Connection
 * ========================================================== */
export default connect(
  mapStateToProps
)(Header);