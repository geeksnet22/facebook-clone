import React from 'react'
import { Avatar } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './LikesPopout.css'

function LikesPopout({user}) {
    return (
        <div className="likesPopout">
            <div className="comment__item__container">
                <Avatar />
                <h4>name</h4>
                <div className="add__friend__container">
                    <PersonAddIcon />
                    <h4>Add Friend</h4>
                </div>
            </div>
        </div>
    )
}

export default LikesPopout
