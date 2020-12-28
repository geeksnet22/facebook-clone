import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import './Post.css'
import ReactionOption from './ReactionOption'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import SharedOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../Firebase';
import firebase from 'firebase'

const Post = forwardRef(({docId, name, message, photoURL, likes, comments, shares}, ref) => {

    const user = useSelector(selectUser)

    const processLike = () => {
        // get document reference
        var postRef = db.collection("posts").doc(docId)
        // if the post is currently liked by the user
        if ( !likes.includes(user.email) ) {
            postRef.update({
                likes: firebase.firestore.FieldValue.arrayUnion(user.email)
            });
        }
        else {
            postRef.update({
                likes: firebase.firestore.FieldValue.arrayRemove(user.email)
            });
        }
    }

    const processComment = () => {

    }

    const processShare = () => {

    }
    
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
                    <p>{likes.length} likes</p>
                </div>
                <div className="comments__shares__container">
                    <p>{comments.length} comments</p>
                    <p>{shares.length} shares</p>
                </div>
            </div>
            <div className="post__buttons__container">
                <ReactionOption Icon={ThumbUpAltOutlinedIcon} text="Like" onClick={processLike} 
                    isLiked={likes.includes(user.email)}/>
                <ReactionOption Icon={ChatOutlinedIcon} text="Comment" onClick={processComment} />
                <ReactionOption Icon={SharedOutlinedIcon} text="Share" onClick={processShare} />
            </div>
        </div>
    )
})

export default Post
