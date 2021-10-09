import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import avatar from "./Avatar.png"
import follow from "./FollowButton.png"
import "./ProfileTab.css"
const ProfileBar = () =>{
    return (
        <Container className="avatar bg-white h-25  d-flex" >
            <img alt=""
                className="avatarpic"
                src={avatar}
            />
            <div classsName="info">
            <Row className="topRow">
                <Col className="fullname" xs={12} md={8}>Frederich Roundhouse</Col>
                <Col className="followButton" xs={6} md={8}><img alt=""
                          className="follow"
                          src={follow}
                          />
                </Col>
            </Row>
            <Row className="middleRow">
                <Col className="userName">@f_rndhouse</Col>
            </Row>
            <Row className="bottomRow">
                <Col>Followers</Col>
                <Col>Following</Col>
                <Col>Level</Col>
            </Row>
            <Row className="followingNumbers">
                <Col>100</Col>
                <Col>100</Col>
                <Col>Amateur</Col>
            </Row>
            </div>
            
        </Container>
    );
}

export default ProfileBar