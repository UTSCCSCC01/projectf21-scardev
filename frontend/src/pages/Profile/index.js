import React from 'react'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import ProfileTab from '../../Components/ProfileTab/ProfileTab'
import ProfileActivity from '../../Components/ProfileActivity/ProfileActivity'
import ProfileBadges from '../../Components/ProfileBadges/ProfileBadges'

/**
 * User profile Page.
 * @returns Profile Page
 */
const Profile = () => {
    return (
        <>
            <NavigationBar />
            <ProfileTab />
            <ProfileActivity />
            <ProfileBadges />
        </>
    )
}

export default Profile