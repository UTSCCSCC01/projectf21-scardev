import React from "react";
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import avatar from '../../assets/Avatar.png'
import "./ProfileFollowers.css"

const ProfileFollowers = () => {

    return(

        <Container className="followerlist">
            <div className="tabHeaders">Followers</div>
            <div align="center"><img alt="" className="pfp" src={avatar}/><img alt="" className="pfp" src={avatar}/><img alt="" className="pfp" src={avatar}/><img alt="" className="pfp" src={avatar}/></div>
            <div className="followers">Vigaash Sivasothy, Salik Chodhary, Jameson Joseph, Rahul Doguparty</div>
        </Container>

    )

}

export default ProfileFollowers