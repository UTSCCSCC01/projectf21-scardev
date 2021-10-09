import { React, useState } from 'react'
import { Form } from 'react-bootstrap'

const Home = () => {

    const userToken = localStorage.getItem('userToken')
    const [agentStatus, setAgentStatus] = useState("true");

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>        
            <h1>Hello, user {userToken}</h1>
            <h2>Agent Status: {agentStatus}</h2>
            <form onSubmit={handleSubmit}>
                <select name="choice" onChange={(e) => setAgentStatus(e.target.value)}>
                    <option value="true">Free Agent</option>
                    <option value="false">Signed</option>
                </select>
                <input type="submit" value="Save" />
            </form>
        </div>
    )
}

export default Home