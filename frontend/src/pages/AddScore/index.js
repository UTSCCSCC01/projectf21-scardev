import React, { useState, Fragment } from 'react'
import { Modal, Button, Form, InputGroup, FormControl, Tabs, Tab, Badge, CloseButton } from 'react-bootstrap'

import jwt_decode from 'jwt-decode'

import styles from './index.module.css'

/**
 * Modal for user to add new game with relevant details.
 * @param show boolean when to show the modal
 * @param handleClose function what to do when modal is closed
 * @returns AddScore Modal
 */
const AddScore = ({show, handleClose}) => {
    const userToken = localStorage.getItem('userToken')


    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [score, setScore] = useState(0)
    const [oppScore, setOppScore] = useState(0)
    const [newPlayer, setNewPlayer] = useState("")
    const [yourTeam, setYourTeam] = useState([])
    const [oppTeam, setOppTeam] = useState([])
    const [currTab, setCurrTab] = useState(0)

    const [error, setError] = useState(null)

    const handleSubmit = () => {

        const payload = {
            created_by: jwt_decode(localStorage.getItem("userToken")).sub,
            location: location,
            date: date,
            score: parseInt(score),
            opp_score: parseInt(oppScore),
            players: yourTeam,
            opp_players: oppTeam,
            approved: false
        }

        console.log(payload)

        fetch('http://localhost:5000/api/v1/games/create', {
            method: 'post',
            body: JSON.stringify(payload)
        }).then(res => {
            if (res.status === 200){
                res.json().then(body => console.log(body))
            }
            
            if (res.status === 400) 
                setError("Invalid request body")
            else if (res.statuse !== 200)
                setError("Create game request failed, please try again") 
        })

        resetFormVariables()
        handleClose()
    }

    const resetFormVariables = () => {
        setLocation("")
        setDate("")
        setScore(0)
        setOppScore(0)
        setNewPlayer("")
        setYourTeam([])
        setOppTeam([])
        setCurrTab(0)
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

    /**
     * Specified player is removed from the appropriate list 
     * based on the current tab.
     * @param e the event trigger by pressing close button
     */
    const removePlayer = (e) => {
        if (currTab === 0) {
            setYourTeam(yourTeam.filter(player => player != e.target.value))
        } else {
            setOppTeam(oppTeam.filter(player => player != e.target.value))
        }
    }

    /**
     * Handle the switching between the Your Team and Opponent tab.
     */
    const handleSwitchTabs = () => {
        setNewPlayer("")
        setCurrTab(currTab ? 0 : 1)
    }

    const handleWindowClose = () => {
        resetFormVariables()
        handleClose()
    }

    return (
        <>
            <Modal show={show} onHide={handleWindowClose}>
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
                    <Button onClick={handleSubmit} className={styles.submitBtn}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddScore