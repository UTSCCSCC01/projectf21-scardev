import { React, useState } from 'react'
import jwt_decode from 'jwt-decode'
import AddScore from '../AddScore'
import { Button } from 'react-bootstrap'

/**
 * Home Page. This is the main feed page.
 * @returns Home Page
 */
const Home = () => {

    const userToken = localStorage.getItem('userToken')
    const [agentStatus, setAgentStatus] = useState(true);

    // Show or hide modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault()

        let decoded = jwt_decode(userToken)
        let email = decoded.sub

        let payload = {
            email: email,
            is_free_agent: agentStatus
        }

        //TODO: figure out
        const myHeaders = new Headers();

        myHeaders.append('Authorization', userToken);

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

    return (
        <div>        
            <h1>Hello, user {userToken}</h1>
            <h2>Agent Status: {agentStatus}</h2>
            <form onSubmit={handleSubmit}>
                <select name="choice" onChange={(e) => setAgentStatus(e.target.value)}>
                    <option value={true}>Free Agent</option>
                    <option value={false}>Signed</option>
                </select>
                <input type="submit" value="Save" />
            </form>

            <Button variant="primary" onClick={handleShow}>
                Add new game
            </Button>

            <AddScore show={show} handleClose={handleClose} />
        </div>
    )
}

export default Home