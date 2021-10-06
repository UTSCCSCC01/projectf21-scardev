import React from 'react'

import { Button, Container, Row, Col, Image } from 'react-bootstrap'

import backgroundImage from '../../assets/landingPageBasketball.png'

/**
 * Landing Page. This is the first page the user sees when connecting to the website
 * if not currently signed in.
 * @returns Landing Page
 */
const Landing = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Image src={backgroundImage}/>
                </Col>
                <Col>
                    <h1>OpenRun</h1>
                    <h4>Already have an account? <a>Sign in</a></h4>
                    <Button>Sign up</Button>
                    <Button>Sign up with Google</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Landing