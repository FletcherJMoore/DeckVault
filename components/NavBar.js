/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container className="signout-container">
        <Link passHref href="/">
          <Navbar.Brand><Image className="nav-logo" src="/Logo.png" alt="logo" /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <div className="tabs">
              <Link passHref href="/">
                <Nav.Link className="nav-link">All Cards</Nav.Link>
              </Link>
              <Link passHref href="/myCards">
                <Nav.Link className="nav-link">My Cards</Nav.Link>
              </Link>
              <Link passHref href="/profile">
                <Nav.Link className="nav-link">Profile</Nav.Link>
              </Link>
              {/* <Search /> */}
            </div>
            <Nav style={{ width: '25%' }}>
              <Button className="signOutButton" variant="danger" onClick={signOut}>Sign Out</Button>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
