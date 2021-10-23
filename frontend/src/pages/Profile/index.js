import React from 'react'
import NavigationBar from '../../Components/NavigationBar'
import ProfileTab from '../../Components/ProfileTab'
import ProfileActivity from '../../Components/ProfileActivity'

/**
 * User profile Page.
 * @returns Profile Page
 */
const Profile = () => {
    return (
        <>
        <NavigationBar/>
        <ProfileTab/>
        <ProfileActivity/>
        </>
    )
}

export default Profile