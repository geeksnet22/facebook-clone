import React from 'react'
import ProfileHeader from './ProfileHeader'
import UserFeed from './UserFeed'
import './UserProfile.css'

function UserProfile({ user }) {
    return (
        <div className="userProfile">
            <ProfileHeader user={user} />
            <UserFeed user={user} />
        </div>
    )
}

export default UserProfile