import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'
import './Post.css'

const Post = forwardRef(({name, message, photoURL}, ref) => {

    return (
        <div ref={ref} className="post">
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
})

export default Post
