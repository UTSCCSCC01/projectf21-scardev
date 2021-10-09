import React from "react";
import { Container, Row, Col, Image, Table} from "react-bootstrap";
import './ProfileActivity.css'
import temp1 from './templateposts/Temp1.png'
import temp2 from './templateposts/Temp2.png'
import temp3 from './templateposts/Temp3.png'

// Component for the activity portion of the profile
// Consists of Recent Activity section and Posts section
const ProfileActivity = () =>{
    return(
        // Is the background of the activity portion
        <Container className="entirefeed bg-white"> 
            <div className="tabHeaders">Recent Activity</div>
            <Container className="innerMarks recentActivity">
            {/* Table section for games played */}
            <Table striped  hover>
                <thead>
                    <tr>
                    <th>Result</th>
                    <th>Score</th>
                    <th>Location</th>
                    <th>Team</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>W</td>
                    <td>11-5</td>
                    <td>Runnymede P.S.</td>
                    <td>Dragons</td>
                    <td>09-23-2021</td>
                    </tr>
                    <tr>
                    <td>L</td>
                    <td>3-11</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>09-19-2021</td>
                    </tr>
                    <tr>
                    <td>W</td>
                    <td>11-9</td>
                    <td>Pan-Am Center</td>
                    <td>Tropic Thunder</td>
                    <td>08-18-2021</td>
                    </tr>
                </tbody>
            </Table>
            </Container>
            {/* Section for Posts */}
            <div className="tabHeaders">Posts</div>
                <div classsName="img-grid">
                    <div className=" img-wrap">
                        <Image src={temp1} rounded/>
                        <Image src={temp2} rounded/>
                        <Image src={temp3} rounded/>
                    </div>
                </div>
            </Container>
            

    );
}

export default ProfileActivity