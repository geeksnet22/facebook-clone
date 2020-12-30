import React from 'react'
import { Avatar } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './LikesPopoutItem.css'

function LikesPopoutItem({ imgSrc, name }) {
    return (
        <div className="likesPopout">
            <div className="comment__item__container">
                <div className="user__info__container">
                    <Avatar src={imgSrc} name={name}/>
                    <p>{name}</p>
                </div>
                <div className="add__friend__container">
                    <PersonAddIcon />
                    <p>Add Friend</p>
                </div>
            </div>
        </div>
    )
}

export default LikesPopoutItem
