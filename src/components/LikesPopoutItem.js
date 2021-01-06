import React from 'react'
import { Avatar } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './LikesPopoutItem.css'

function LikesPopoutItem({ imgSrc, displayName, isCurrentUser }) {
    return (
        <div className="likesPopoutItem">
            <div className="comment__item__container">
                <div className="user__info__container">
                    <Avatar src={imgSrc} />
                    <p>{displayName}</p>
                </div>
                {!isCurrentUser && <div className="add__friend__container">
                    <PersonAddIcon />
                    <p>Add Friend</p>
                </div>}
            </div>
        </div>
    )
}

export default LikesPopoutItem
