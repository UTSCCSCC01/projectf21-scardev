import React, { useState, Fragment, useEffect } from 'react'
import { Button, Form, Modal, InputGroup, FormControl, Tabs, Tab, ListGroup } from 'react-bootstrap'

import ToastMessage from '../ToastMessage'

import styles from './index.module.css'

import jwt_decode from 'jwt-decode'


const VerifyScoreModal = ({show, handleClose, game}) => {

    const [approvalState, setApprovalState] = useState(false)
    const [comment, setComment] = useState("")

    const userToken = localStorage.getItem('userToken')

    const [team, setTeam] = useState("")
    const [status, setStatus] = useState("")

    // Show or hide toast message
    const [showToast, setShowToast] = useState(false)
    const toggleShow = () => setShowToast(!showToast)

    const getTeam = () => {
        let email = jwt_decode(userToken).sub
        if (game.players.includes(email) || email === game.created_by) {
            setTeam("player")
        } else {
            setTeam("opponent")
        }
    }

    const getStatus = () => {
        getTeam()
        if (team === "player" && game.score > game.opp_score || team === "opponent" && game.score < game.opp_score) {
            setStatus("Win")
        } else {
            setStatus("Loss")
        }
    }

    const handleApprove = () => {
        setApprovalState(true)

        const payload = {
            _id: game.ID
        }

        fetch('http://localhost:5000/api/v1/games/approve', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then(res => {
            if(res.status === 204) {
                setComment("")
                handleClose()
                setShowToast(true)
            }
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getStatus()
    }, [])

    return (
        <>  
            <ToastMessage show={showToast} toggle={toggleShow} gameID={game.ID} />
            <Modal show={show} onEnter={getStatus} onHide={handleClose} scrollable={true} contentClassName={styles.modal}>
                <Modal.Header closeButton>
                    Verify Game
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Created By
                        </Form.Label>
                        <Form.Control type="text" placeholder={game.created_by} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Location
                        </Form.Label>
                        <Form.Control type="text" placeholder={game.location} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Date
                        </Form.Label>
                        <Form.Control type="text" placeholder={game.date} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {   status === "Win" ?
                            <Form.Label>Score: <strong className={styles.win}>Win</strong></Form.Label> : 
                            <Form.Label>Score: <strong className={styles.loss}>Loss</strong></Form.Label>
                        }
                        <InputGroup className="mb-3">
                            <Form.Control placeholder={game.score} readOnly />
                            <Form.Control placeholder={game.opp_score} readOnly />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Tabs defaultActiveKey="team" className="mb-3">
                            <Tab eventKey="team" title="Your Team" tabClassName={styles.tabColor}>
                                <ListGroup>
                                    {   
                                        team === "player" ? 
                                        game.players.map(player => {
                                            return (
                                                <ListGroup.Item key={player}>{player}</ListGroup.Item>
                                            )
                                        })  : 
                                        game.opp_players.map(player => {
                                            return (
                                                <ListGroup.Item key={player}>{player}</ListGroup.Item>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </Tab>
                            <Tab eventKey="opponent" title="Opponent" tabClassName={styles.tabColor}>
                                <ListGroup>
                                    {
                                        team === "opponent" ? 
                                        game.players.map(player => {
                                            return (
                                                <ListGroup.Item key={player}>{player}</ListGroup.Item>
                                            )
                                        })  : 
                                        game.opp_players.map(player => {
                                            return (
                                                <ListGroup.Item key={player}>{player}</ListGroup.Item>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </Tab>
                        </Tabs>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Rejection Comment (optional):</Form.Label>
                        <Form.Control as="textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger">Reject</Button>
                    <Button variant="success" onClick={handleApprove}>Approve</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VerifyScoreModal