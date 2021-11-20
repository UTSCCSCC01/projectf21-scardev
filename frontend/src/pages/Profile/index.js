import React from 'react'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import ProfileTab from '../../Components/ProfileTab/ProfileTab'
import ProfileActivity from '../../Components/ProfileActivity/ProfileActivity'
import ProfileBadges from '../../Components/ProfileBadges/ProfileBadges'
import ProfileFollowers from '../../Components/ProfileFollowers/ProfileFollowers'
import ProfileFollowing from '../../Components/ProfileFollowing/ProfileFollowing'

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
<<<<<<< HEAD
=======
            <ProfileFollowers />
            <ProfileFollowing />
>>>>>>> 42b35ec540633dfa215c586dc6e8830d60be5d9c
        </>
    )
}

export default Profile