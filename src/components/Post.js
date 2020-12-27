import React from 'react'
import { Avatar } from '@material-ui/core'
import './Post.css'

function Post({name, message, photoURL}) {

    return (
        <div className="post">
            <div className="post__header">
                <Avatar src={photoURL}/>
                <h2>{name}</h2>
            </div>
            <div className="post__message">
                <p>{message}</p>
            </div>
            <div className="post__buttons__container">
                
            </div>
        </div>
    )
}

export default Post
