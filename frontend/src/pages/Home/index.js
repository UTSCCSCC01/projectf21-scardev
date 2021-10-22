import { React, useState, useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'

import jwt_decode from 'jwt-decode'

import AddScore from '../AddScore'
import VerifyScoreModal from '../VerifyScoreModal'
import ToastMessage from '../ToastMessage'

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

    // Show or hide toast message
    // const [showToast, setShowToast] = useState(true)
    // const toggleShow = () => setShowToast(!showToast)

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
            header: myHeaders
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
    }, [])


    return (
        <div>        
            <h1>Hello, {email}</h1>
            <h2>Agent Status: {agentStatus}</h2>

            <form onSubmit={handleSubmit}>
                <select name="choice" onChange={(e) => setAgentStatus(e.target.value)}>
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
                {
                    userGames.map(game => {
                        return (
                            <ListGroup.Item key={game}>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{game.location}</div>
                                    {game.date}
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