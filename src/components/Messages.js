import React, { useState, useEffect, forwardRef } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import CreateIcon from '@material-ui/icons/Create'
import SearchIcon from '@material-ui/icons/Search'
import MessageItem from './MessageItem'
import './Messages.css'
import { db } from '../Firebase'

const Messages = forwardRef(({currentUserId, openMessageCreator}, ref) => {
    
    const [messagedUserIds, setMessagedUserIds] = useState([])

    useEffect(() => {
        db.collection(`users/${currentUserId}/chats`)
        .orderBy("timestamp", "desc").onSnapshot((userSnapshot) => {
            setMessagedUserIds(userSnapshot.docs.map(doc => (
              {
                userId: doc.id
              }
            )))
          })
    }, [currentUserId])

    return (
        <div ref={ref} className="messages">
            <div className="header">
                <h2>Messenger</h2>
                <div className="header__icons">
                    <MoreHorizIcon />
                    <FullscreenIcon />
                    <CreateIcon />
                </div>
            </div>
            <div className="search__container">
                <div className="form__container">
                    <SearchIcon style={{marginLeft: "5px", height:"20px", width:"20px"}} />
                    <form>
                        <input type="text" placeholder="Search Messenger"/>
                        <button></button>
                    </form>
                </div>
            </div>

            {currentUserId && messagedUserIds.map(messagedUserId => (
                <MessageItem key={messagedUserId.userId} messagedUserId={messagedUserId} 
                    currentUserId={currentUserId} openMessageCreator={openMessageCreator} />
            ))}
        </div>
    )
})

export default Messages
