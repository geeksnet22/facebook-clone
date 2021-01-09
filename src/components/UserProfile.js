import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import ProfileHeader from './ProfileHeader'
import UserFeed from './UserFeed'
import './UserProfile.css'

function UserProfile({ match }) {
 
    const [user, setUser] = useState(null)

    useEffect(() => {
        db.collection("users").doc(match.params.id).get().then((doc) => {
            const data = doc.data()
            setUser(
                {
                    uid: doc.id,
                    displayName: data.displayName,
                    email: data.email,
                    photoURL: data.photoURL
                }
            )
        })
    }, [])

    return (
        <div className="userProfile">
            {user && <ProfileHeader user={user} />}
            {user && <UserFeed user={user} />}
        </div>
    )
}

export default UserProfile