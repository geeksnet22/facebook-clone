import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import './Post.css'
import ReactionOption from './ReactionOption'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import SharedOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlined from '@material-ui/icons/SendOutlined';

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
            <div className="post__reactions">
                <div className="likes__container">
                    <ThumbUpIcon fontSize="inherit"/>
                    <p>0 likes</p>
                </div>
                <div className="comments__shares__container">
                    <p>0 comments</p>
                    <p>0 shares</p>
                </div>
            </div>
            <div className="post__buttons__container">
                <ReactionOption Icon={ThumbUpAltOutlinedIcon} text="Like"/>
                <ReactionOption Icon={ChatOutlinedIcon} text="Comment" />
                <ReactionOption Icon={SharedOutlinedIcon} text="Share" />
            </div>
        </div>
    )
})

export default Post
