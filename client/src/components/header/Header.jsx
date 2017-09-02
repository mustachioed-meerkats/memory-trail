import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">MemoryTrail</Link> <small>Explore and share</small>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Text pullRight>
        <Navbar.Link href="/api/auth/google">Login</Navbar.Link>
      </Navbar.Text>
      <Nav pullRight>
        <LinkContainer to='/profile'>
          <NavItem>Profile</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
