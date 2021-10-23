import React, { useState, Fragment } from 'react'
import { Button, Form, Modal, InputGroup, FormControl, Tabs, Tab, ListGroup } from 'react-bootstrap'

import styles from './index.module.css'

const VerifyScoreModal = ({show, handleClose}) => {

    // 0 = reject, 1 = approved
    const [approvalState, setApprovalState] = useState(0)
    const [comment, setComment] = useState("")

    const handleApprove = () => {
        setApprovalState(1)
        setComment("")
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} scrollable={true} contentClassName={styles.modal}>
            <Modal.Header closeButton>
                Verify Game
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Location
                    </Form.Label>
                    <Form.Control type="text" placeholder="Panam Center" readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Date
                    </Form.Label>
                    <Form.Control type="text" placeholder="2021-10-06" readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Score: <strong className={styles.loss}>Loss</strong></Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control placeholder="6" readOnly />
                        <Form.Control placeholder="11" readOnly />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Tabs defaultActiveKey="team" className="mb-3">
                        <Tab eventKey="team" title="Your Team" tabClassName={styles.tabColor}>
                            <ListGroup>
                                <ListGroup.Item>dabhatia</ListGroup.Item>
                                <ListGroup.Item>schodhary</ListGroup.Item>
                                <ListGroup.Item>seneca24</ListGroup.Item>
                                <ListGroup.Item>884499</ListGroup.Item>
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="opponent" title="Opponent" tabClassName={styles.tabColor}>
                            <ListGroup>
                                <ListGroup.Item>jjwavyy</ListGroup.Item>
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