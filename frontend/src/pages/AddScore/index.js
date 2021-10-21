import React, { useState, Fragment } from 'react'
import { Modal, Button, Form, InputGroup, FormControl, Tabs, Tab, Badge, CloseButton } from 'react-bootstrap'

import styles from './index.module.css'

/**
 * Modal for user to add new game with relevant details.
 * @param show boolean when to show the modal
 * @param handleClose function what to do when modal is closed
 * @returns AddScore Modal
 */
const AddScore = ({show, handleClose}) => {

    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [score, setScore] = useState(0)
    const [oppScore, setOppScore] = useState(0)
    const [newPlayer, setNewPlayer] = useState("")
    const [yourTeam, setYourTeam] = useState([])
    const [oppTeam, setOppTeam] = useState([])
    const [currTab, setCurrTab] = useState(0)

    const handleSubmit = () => {
        console.log(location)
        console.log(date)
        console.log(score)
        console.log(oppScore)

        handleClose()
    }

    /**
     * If enter key was pressed then add the player to the 
     * appropriate list based on the current tab
     * @param e the event triggered by submitting form
     */
    const addPlayer = (e) => {
        if(e.code === "Enter") {
            if (currTab === 0) {
                setYourTeam(yourTeam => [...yourTeam, newPlayer])
            } else {
                setOppTeam(oppTeam => [...oppTeam, newPlayer])
            }
            setNewPlayer("")
        } 
    }

    const removePlayer = (e) => {
        if (currTab === 0) {
            setYourTeam(yourTeam.filter(player => player != e.target.value))
        } else {
            setOppTeam(oppTeam.filter(player => player != e.target.value))
        }
    }

    const handleSwitchTabs = () => {
        setNewPlayer("")
        setCurrTab(currTab ? 0 : 1)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter court location" onChange={e => setLocation(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" onChange={e => setDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Score</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Your score" onChange={e => setScore(e.target.value)} />
                                <FormControl placeholder="Opponent score" onChange={e => setOppScore(e.target.value)} />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Players</Form.Label>
                            <Tabs defaultActiveKey="team" className="mb-3" onSelect={handleSwitchTabs}>
                                <Tab eventKey="team" title="Your Team" tabClassName={styles.tabColor}>
                                    <div className={styles.pillsContainer}>
                                        {
                                            yourTeam.map((player) => {
                                                return (
                                                    <Fragment key={player}>
                                                        <Badge pill bg="secondary">
                                                            <div className={styles.pill}>
                                                                {player}
                                                                <CloseButton variant="white" value={player} onClick={removePlayer} />
                                                            </div>
                                                        </Badge>{" "}
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </div>

                                    <Form.Control placeholder="Search for player" value={newPlayer} onChange={e => setNewPlayer(e.target.value)} onKeyPress={addPlayer} />
                                </Tab>
                                <Tab eventKey="opponent" title="Opponent" tabClassName={styles.tabColor}>
                                    <div className={styles.pillsContainer} >
                                        {
                                            oppTeam.map((player) => {
                                                return (
                                                    <Fragment key={player}>
                                                        <Badge pill bg="secondary">
                                                            <div className={styles.pill}>
                                                                {player}
                                                                <CloseButton variant="white" value={player} onClick={removePlayer} />
                                                            </div>
                                                        </Badge>{" "}
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </div>

                                    <Form.Control placeholder="Search for player" value={newPlayer} onChange={e => setNewPlayer(e.target.value)} onKeyPress={addPlayer} />
                                </Tab>
                            </Tabs>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleSubmit} className={styles.submitBtn}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddScore