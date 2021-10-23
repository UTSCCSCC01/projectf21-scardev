import { React, useState } from 'react'
import { Button } from 'react-bootstrap'

import jwt_decode from 'jwt-decode'
import NavBar from '../../Components/NavigationBar'

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
    const handleShowVerfiy = () => setShowVerify(true)

    // Show or hide toast message
    const [showToast, setShowToast] = useState(true)
    const toggleShow = () => setShowToast(!showToast)

    const handleSubmit = async (e) => {
        e.preventDefault()

        let decoded = jwt_decode(userToken)
        let email = decoded.sub

        let payload = {
            email: email,
            is_free_agent: agentStatus
        }

        //TODO: figure out
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

    return (
        <div>
            <NavBar/>
            <h1>Hello, user {userToken}</h1>
            <h2>Agent Status: {agentStatus.toString()}</h2>
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

            <Button variant="warning" onClick={handleShowVerfiy} >
                Verify game
            </Button>

            <VerifyScoreModal show={showVerify} handleClose={handleCloseVerify} />

            <ToastMessage show={showToast} toggle={toggleShow} />
        </div>
    )
}

export default Home