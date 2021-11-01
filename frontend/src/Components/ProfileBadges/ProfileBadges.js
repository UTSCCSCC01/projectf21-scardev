import React from 'react'
import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap'

import './ProfileBadges.css'

import TrophyModel from '../TrophyModel'
import CameraModel from '../CameraModel'
import BasketballModel from '../BasketballModel'

const ProfileBadges = () => {
    return (
        <Container className="entirefeed bg-white">
            <div className="tabHeaders">Achievements</div>
            <div className="badges">
                <div className="badge">
                    <TrophyModel />
                    <OverlayTrigger
                        placement={'top'}
                        overlay={
                            <Tooltip className="tooltip">
                                Earned by winning 10 or more total games.
                            </Tooltip>
                        }
                    >
                        <h2 className="badge-name">Champion</h2>
                    </OverlayTrigger>
                </div>
                <div className="badge">
                    <CameraModel />
                    <OverlayTrigger
                        placement={'top'}
                        overlay={
                            <Tooltip>
                                Earned by sharing a post with others.
                            </Tooltip>
                        }
                    >
                        <h2 className="badge-name">Highlight Reel</h2>
                    </OverlayTrigger>
                </div>
                <div className="badge">
                    <BasketballModel />
                    <OverlayTrigger
                        placement={'top'}
                        overlay={
                            <Tooltip>
                                Earned by playing in your first game.
                            </Tooltip>
                        }
                    >
                        <h2 className="badge-name">Newbie</h2>
                    </OverlayTrigger>
                </div>
            </div>
        </Container>
    )
}

export default ProfileBadges