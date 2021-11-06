import React from "react";
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import avatar from '../../assets/Avatar.png'
import "./ProfileFollowing.css"

const ProfileFollowing = () => {

    return(

        <Container className="followinglist">
            <div className="tabHeaders">Following</div>
            <div align="center"><img alt="" className="pfp" src={avatar}/><img alt="" className="pfp" src={avatar}/><img alt="" className="pfp" src={avatar}/><img alt="" className="pfp" src={avatar}/></div>
            <div className="following">Vigaash Sivasothy, Salik Chodhary, Jameson Joseph, Rahul Doguparty</div>
        </Container>

    )

}

export default ProfileFollowing