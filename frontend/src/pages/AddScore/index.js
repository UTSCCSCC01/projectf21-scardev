import React from 'react'
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'

const AddScore = ({show, handleClose}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Record new game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter court location" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Score</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl aria-label="First name" />
                                <FormControl aria-label="Last name" />
                            </InputGroup>
                            <Form.Text className="muted-text">Please enter your score on the left and opponent score on the right</Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddScore