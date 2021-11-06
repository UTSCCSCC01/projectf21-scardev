
import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import avatar from "../assets/Avatar.png"
import Drop from "./DropDown"
import follow from "../assets/FollowButton.png"

import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/menu.min.css'
import 'semantic-ui-css/components/list.min.css'
import 'semantic-ui-css/components/item.min.css'
import 'semantic-ui-css/components/transition.min.css'
// import 'semantic-ui-css/components/dropdown.css'
// import 'semantic-ui-css/semantic.min.css'
import "./ProfileTab.css"
// Component for the profile bar section of the profile page
// Consists of the avatar, username, name, followers, following, level, and button for other users to follow
const ProfileBar = () =>{
        const userToken = localStorage.getItem('userToken')
        const [name, setName] = useState('');
        const [followers, setFollowers] = useState(-1);
        const [following, setFollowing] = useState(-1);
        const avatar = 'https://i.ibb.co/TbHYjD5/Avatar.png'
        

        useEffect(() => {

            const payload = {
                token: userToken
            }

            const myHeaders = new Headers();

            myHeaders.append('Authorization', userToken);

            fetch('http://localhost:5000/api/v1/user/getname', {
                method: 'put',
                body: JSON.stringify(payload),
                headers: myHeaders
            })
            .then(res => {
                if (res.status == 200){
                    res.json().then(body => {
                        setName(body.data)
                    })
                }


            })

            fetch('http://localhost:5000/api/v1/user/getfollowerscount', {
                method: 'put',
                body: JSON.stringify(payload),
                headers: myHeaders
            })
            .then(res => {
                if (res.status == 200){
                    res.json().then(body => {
                        setFollowers(body.data)
                    })
                }


            })

            fetch('http://localhost:5000/api/v1/user/getfollowingcount', {
                method: 'put',
                body: JSON.stringify(payload),
                headers: myHeaders
            })
            .then(res => {
                if (res.status == 200){
                    res.json().then(body => {
                        setFollowing(body.data)
                    })
                }


            })
        }, []);

    return (
       // Background for the profile bar section

        <Container className="avatar bg-white  d-flex" >
            {/* Section for profile picture */}
            <img alt=""
                className="avatarpic"
                src={avatar}
            />
            {/* <input
        type="file"
        name="myImage"
        onChange={(event) => {
            URL.revokeObjectURL(selectedImage);
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      /> */}
            <div classsName="info">
                {/* Top Row section that consists of name and follow button */}
            <Row className="topRow">
                <Col className="fullname" xs={12} md={8}>{name}</Col>
                <Col className="followButton" xs={6} md={8}> ALIGN{/* <img alt=""
                          className="follow"
                          src={follow}
                          /> */}
                </Col>
            </Row>
            {/* Middle section that consists of username */}
           {/*<Row className="middleRow">
                              <Col className="userName">@f_rndhouse</Col>
                          </Row>*/}

            {/* Bottom section that consists followers, following and level */}
            <Row className="bottomRow">
                <Col>Followers</Col>
                <Col>Following</Col>
                <Col>Level</Col>
            </Row>
            {/* Actual data for the above categories */}
            <Row className="followingNumbers">
                <Col>{followers}</Col>
                <Col>{following}</Col>
                <Col className="dropmenu"><Drop /> </Col>
            </Row>
            </div>
            
        </Container>
    );
}

export default ProfileBar