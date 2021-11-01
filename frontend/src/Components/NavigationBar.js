import React from "react";
import {Navbar, Nav, NavDropdown, Container, Form, Button, FormControl} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../index.css'

import image from '../assets/OpenRun.png'
import feed from '../assets/Feed.png'
import maps from '../assets/Maps.png'
import messages from '../assets/Messages.png'
import profile from '../assets/Profile.png'

// Component for the navigation bar, consisting of button to return to homepage, searchbar, and other buttons
const NavigationBar = () => {
    return (
      <>
            {/* Background for navigation bar */}
             <Navbar className="bg-white main-navigation" expand="lg">
               {/* Image and link for homepage button */}
              <Navbar.Brand as={Link} to="/feed"><img alt=""
                                    src={image}
                                    width="110"
                                    height="30"
                                    className="d-inline-block align-top ms-5"
                                    />{' '}
                                    </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                {/* Search bar section */}
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="ms-5 bg-light"
                    aria-label="Search"
                  />
                </Form>
                {/* Section for links on navigation bar */}
                <Nav
                  className="ms-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
                  >
                    {/* Image for feed button  */}
                  <Nav.Link href="#feed"><img alt=""
                                    src={feed}
                                    crop="fill"
                                    height="17"
                                    width="19"
                                    />{' '}
                                    </Nav.Link>
                  {/* Image for maps button */}
                  <Nav.Link href="#maps"><img alt=""
                                    src={maps}
                                    crop="fill"
                                    height="20"
                                    width="18"
                                    />{' '}
                                    </Nav.Link>
                  {/* Image for messages button */}
                  <Nav.Link href="#messages"><img alt=""
                                    src={messages}
                                    crop="fill"
                                    height="18"
                                    width="18"
                                    />{' '}
                                    </Nav.Link>
                    {/* Image for profile button */}
                  <Nav.Link as={Link} to='/profile' ><img alt=""
                                    src={profile}
                                    crop="fill"
                                    height="30"
                                    width="30"
                                    />{' '}
                                    </Nav.Link>
                  {/* Temporary dropdown button  */}
                  <NavDropdown   id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#matchhistory">Match History</NavDropdown.Item>
                    <NavDropdown.Item href="#courts">Courts</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#sections">Sections</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              </Navbar>
            </>
        
    )
}
export default NavigationBar
