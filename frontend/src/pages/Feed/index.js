import React, { useState, useEffect, Fragment } from 'react'
import { Button, ListGroup, Container, Row, Col, Badge } from 'react-bootstrap'

import jwt_decode from 'jwt-decode'

import AddScore from '../AddScore'
import VerifyScoreModal from '../VerifyScoreModal'
import NavigationBar from '../../Components/NavigationBar'

import styles from './index.module.css'

const Feed = () => {
    const userToken = localStorage.getItem('userToken')

    // Show or hide create game modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Show or hide verify game modal
    const [showVerify, setShowVerify] = useState(false)
    const handleCloseVerify = () => setShowVerify(false)
    const handleShowVerify = (game) => {
        setGameToShow(game)
        setShowVerify(true)
    }
    const [gameToShow, setGameToShow] = useState(null)

    const [userGames, setUserGames] = useState([])

    const decoded = jwt_decode(userToken)
    const email = decoded.sub

    const handleGetGames = async () => {
        fetch('http://localhost:5000/api/v1/games/get?email=' + email, {
            method: 'GET',
        })
        .then(res => {
            if(res.status === 200) {
                res.json().then(body => {
                    setUserGames(body.data)
                })
            }
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        handleGetGames()
    }, [])

    return (
        <Fragment>
            <NavigationBar />

            <Container className={styles.container}>
                <Row className={"justify-content-md-center"}>
                    <Col xs={9}>
                        Hello World
                    </Col>
                    <Col className={styles.rightContainer}>


                    <AddScore show={show} handleClose={handleClose} />

                    {gameToShow && <VerifyScoreModal show={showVerify} handleClose={handleCloseVerify} game={gameToShow} />}
        
                    <ListGroup>
                        <div className={styles.addBtnContainer}>
                            <div className="fw-bold">Your Games</div>
                            <Button className={styles.addBtn} onClick={handleShow} >
                                New game +
                            </Button>
                        </div>
                        
                        {
                            userGames.reverse().map(game => {
                                if (game.created_by === email) {
                                    return (
                                        <ListGroup.Item key={game.ID}>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">
                                                    Location: {game.location}
                                                <div>
                                            </div>
                                            </div>
                                                <strong>Date: </strong>{game.date}
                                                <br/>
                                                <strong>Game ID: </strong>{game.ID}
                                            </div>
                                            {
                                                    game.approved === true ? 
                                                    <Badge bg="success" pill className={styles.statusBadge}>Approved!</Badge> :
                                                    <Badge bg="secondary" pill className={styles.statusBadge}>Awaiting approval...</Badge>
                                            }
                                        </ListGroup.Item>
                                    )
                                }
                            })
                        }
                    </ListGroup> 

                    <ListGroup>
                        <div className={styles.addBtnContainer}>
                            <div className="fw-bold">Require verification</div>
                        </div>

                        {
                            userGames.map(game => {
                                if (game.approved !== false || game.created_by === email) {
                                    return null;
                                }

                                return (
                                    <ListGroup.Item key={game.ID}>
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold">Location: {game.location}</div>
                                                <strong>Date: </strong>{game.date}
                                                <br/>
                                                <strong>Game ID: </strong>{game.ID}
                                        </div>
                                        <Button variant="warning" onClick={() => handleShowVerify(game)} className={styles.verifyBtn}>
                                            Verify
                                        </Button>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>      
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Feed