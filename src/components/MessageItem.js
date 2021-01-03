import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import './MessageItem.css'

function MessageItem({ userId, currentUserId }) {

    const [messageData, setMessageData] = useState(null)

    useEffect(() => {
        db.collection(`users/${currentUserId}/chats/${userId.userId}/messages`)
        .orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setMessageData(snapshot.docs[0].data())})
    }, [])

    return (
        <div className="messageItem">
            {messageData && 
            <>
                <Avatar src={messageData.photoURL} style={{height: "50px", width: "50px"}}/>
                <div className="name__and__last__message__container">
                    <h4>{messageData.user.name}</h4>
                    <p>{messageData.message}</p>
                </div>
            </>}
        </div>
    )
}

export default MessageItem
