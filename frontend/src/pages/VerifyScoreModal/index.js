import React, { useState, Fragment, useEffect } from 'react'
import { Button, Form, Modal, InputGroup, FormControl, Tabs, Tab, ListGroup } from 'react-bootstrap'

import styles from './index.module.css'

import jwt_decode from 'jwt-decode'


const VerifyScoreModal = ({show, handleClose, game}) => {

    // 0 = reject, 1 = approved
    const [approvalState, setApprovalState] = useState(0)
    const [comment, setComment] = useState("")

    const userToken = localStorage.getItem('userToken')

    const [team, setTeam] = useState("")
    const [status, setStatus] = useState("")

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
        setApprovalState(1)
        setComment("")
        handleClose()
    }

    useEffect(() => {
        getStatus()
    }, [])

    return (
        <Modal show={show} onHide={handleClose} scrollable={true} contentClassName={styles.modal}>
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
                                            <ListGroup.Item>{player}</ListGroup.Item>
                                        )
                                    })  : 
                                    game.opp_players.map(player => {
                                        return (
                                            <ListGroup.Item>{player}</ListGroup.Item>
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
                                            <ListGroup.Item>{player}</ListGroup.Item>
                                        )
                                    })  : 
                                    game.opp_players.map(player => {
                                        return (
                                            <ListGroup.Item>{player}</ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Comments (optional):</Form.Label>
                    <Form.Control as="textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger">Reject</Button>
                <Button variant="success" onClick={handleApprove}>Approve</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VerifyScoreModal