import React from 'react'
import { Avatar } from '@material-ui/core'
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded'
import CallIcon from '@material-ui/icons/Call';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './ProfileHeader.css'

function ProfileHeader({ user }) {
    return (
        <div className="profileHeader">
            <div className="cover__photo__container">
                
            </div>
            <div className="user__container">
                <Avatar src={user.photoURL} style={{height: "200px", width: "200px"}}/>
                <h1>{user.displayName}</h1>
            </div>
            <div className="header__items">
                <div className="left__portion">
                    <h4>Post</h4>
                    <h4>About</h4>
                    <h4>Friends</h4>
                    <h4>Photos</h4>
                    <h4>Videos</h4>
                    <h4>More</h4>
                </div>
                <div className="right__portion">
                    <div className="message__container">
                        <ChatBubbleRoundedIcon />
                        <h4>Message</h4>
                    </div>
                    < CallIcon />
                    <GroupAddIcon />
                    <MoreHorizIcon style={{margin: 0}} />
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
