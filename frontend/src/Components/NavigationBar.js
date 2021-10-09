import React from "react";
import {Navbar, Nav, NavDropdown, Container, Form, Button, FormControl} from 'react-bootstrap'
import '../index.css'
import image from './OpenRun.png'
import feed from './Feed.png'
import maps from './Maps.png'
import messages from './Messages.png'
import profile from './Profile.png'

const NavigationBar = ()=>{
    return (
      <>
       <Navbar className="bg-white main-navigation" expand="lg">
        <Navbar.Brand href="#home"><img alt=""
                              src={image}
                              width="110"
                              height="30"
                              className="d-inline-block align-top ms-5"
                              />{' '}
                              </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="ms-5 bg-light"
              aria-label="Search"
            />
          </Form>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            >
            <Nav.Link href="#action1"><img alt=""
                              src={feed}
                              crop="fill"
                              height="17"
                              width="19"
                              />{' '}
                              </Nav.Link>
            <Nav.Link href="#action2"><img alt=""
                              src={maps}
                              crop="fill"
                              height="20"
                              width="18"
                              />{' '}
                              </Nav.Link>
            <Nav.Link href="#action2"><img alt=""
                              src={messages}
                              crop="fill"
                              height="18"
                              width="18"
                              />{' '}
                              </Nav.Link>
            <Nav.Link href="#action3"><img alt=""
                              src={profile}
                              crop="fill"
                              height="30"
                              width="30"
                              />{' '}
                              </Nav.Link>
            <NavDropdown   id="navbarScrollingDropdown">
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
