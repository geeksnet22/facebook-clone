import { Avatar } from '@material-ui/core'
import React from 'react'
import './MessageItem.css'

function MessageItem({ imgSrc, name, lastMessage }) {
    return (
        <div className="messageItem">
            <Avatar src={imgSrc} style={{height: "50px", width: "50px"}}/>
            <div className="name__and__last__message__container">
                <h4>{name}</h4>
                <p>{lastMessage}</p>
            </div>
        </div>
    )
}

export default MessageItem
