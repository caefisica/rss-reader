import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
import "./TopBar.css";

function TopBar({ location }) {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="px-3">
      <Navbar.Brand href="/" className="font-weight-bold">RSS del CAE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/sources" active={location.pathname === "/sources"}>
            Fuentes
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(TopBar);
