import React from "react";
import {Navbar, Nav, NavDropdown, Container, Form, Button, FormControl} from 'react-bootstrap'


const NavigationBar = ()=>{
    return (
        <>
       <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#">OpenRun</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
  <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
    </Form>
    <Nav
      className="ms-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link href="#action1">Feed</Nav.Link>
      <Nav.Link href="#action2">Maps</Nav.Link>
      <Nav.Link href="#action2">Messages</Nav.Link>
      <Nav.Link href="#action3">Profile Page</Nav.Link>
      <NavDropdown title="DropDownMenu" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
        </>
        
    )
}
export default NavigationBar
