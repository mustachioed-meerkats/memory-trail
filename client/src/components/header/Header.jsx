import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import navbar from '../../styles/navbar';

const Header = (props) => {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <Image src="http://i.imgur.com/LEj6FJG.png" alt="Memory Trail" width={32}/>
          </Link> 
          <small> Explore and share</small>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to='/post/new'>
            <NavItem eventKey="1">Write a Story</NavItem>
          </LinkContainer>
          <LinkContainer to='/feed'>
            <NavItem eventKey="2">Feed</NavItem>
          </LinkContainer>
          <LinkContainer to='/profile'>
            <NavItem eventKey="3">{props.user.display}</NavItem>
          </LinkContainer>
          <NavItem href="/logout" eventKey="4">Logout</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(Header);