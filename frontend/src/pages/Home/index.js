import { React, useState, useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'


import jwt_decode from 'jwt-decode'
import NavBar from '../../Components/NavigationBar'


import AddScore from '../AddScore'
import VerifyScoreModal from '../VerifyScoreModal'
import ToastMessage from '../ToastMessage'

import AddScore from '../AddScore'
import VerifyScoreModal from '../VerifyScoreModal'
import NavigationBar from '../../Components/NavigationBar'

/**
 * Home Page. This is the main feed page.
 * @returns Home Page
 */
const Home = () => {

    const userToken = localStorage.getItem('userToken')
    const [agentStatus, setAgentStatus] = useState(true)

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        let payload = {
            email: email,
            is_free_agent: agentStatus
        }

        const myHeaders = new Headers()

        myHeaders.append('Authorization', userToken)

        fetch('http://localhost:5000/api/v1/user/freeagentstatus', {
            method: 'put',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        })
        .then(res => {
            if(res.status === 204) {
                return
            }
        }).catch(err => console.log(err))
    }


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
    }, [userGames])


    return (
        <div>        
            <NavigationBar />
            <h1>Hello, {email}</h1>
            <h2>Agent Status: {agentStatus}</h2>

            <form onSubmit={handleSubmit}>
                <select name="choice" onChange={(e) => setAgentStatus(e.target.value === "false" ? false : true)}>
                    <option value={true}>Free Agent</option>
                    <option value={false}>Signed</option>
                </select>
                <input type="submit" value="Save" />
            </form>

            <Button variant="primary" onClick={handleShow} >
                Add new game
            </Button>

            <AddScore show={show} handleClose={handleClose} />

            {gameToShow && <VerifyScoreModal show={showVerify} handleClose={handleCloseVerify} game={gameToShow} />}

            {/* <ToastMessage show={showToast} toggle={toggleShow} /> */}
  
            <ListGroup>
                <div className="fw-bold">Games created by you</div>
                {
                    userGames.reverse().map(game => {
                        if (game.created_by === email) {
                            return (
                                <ListGroup.Item key={game.ID}>
                                    <div className="ms-2 me-auto">
                                    <div className="fw-bold">Location: {game.location}</div>
                                        Date: {game.date}
                                        <br/>
                                        Game ID: {game.ID}
                                    </div>
                                    {
                                        game.approved === true ? 
                                        <Button variant="success" disabled>Approved!</Button> :
                                        <Button variant="dark" disabled>Awaiting approval...</Button>
                                    }
                                    
                                </ListGroup.Item>
                            )
                        }
                    })
                }
            </ListGroup> 

            <ListGroup>
                <div className="fw-bold">Games requesting your approval</div>
                {
                    userGames.map(game => {
                        if (game.approved !== false || game.created_by === email) {
                            return null;
                        }

                        return (
                            <ListGroup.Item key={game.ID}>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Location: {game.location}</div>
                                    Date: {game.date}
                                    <br/>
                                    Game ID: {game.ID}
                                </div>
                                <Button variant="warning" onClick={() => handleShowVerify(game)} >
                                    Verify
                                </Button>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>          
        </div>
    )
}

export default Home