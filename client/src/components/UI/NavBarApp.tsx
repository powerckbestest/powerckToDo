import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function NavBarApp(): JSX.Element {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <NavLink className="nav-link" to="/">
          Tasks
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Powerck ToDo</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
