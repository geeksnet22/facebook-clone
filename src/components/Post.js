import React, { useState, useEffect, forwardRef, useRef } from 'react'
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
import CommentItem from './CommentItem'
import FlipMove from 'react-flip-move'

const Post = forwardRef(({postId, name, message, photoURL}, ref) => {

    const currentUser = useSelector(selectUser)
    const [commentInput, setCommentInput] = useState("")
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [numOfLikes, setNumOfLikes] = useState(0)
    const [numOfComments, setNumOfComments] = useState(0)
    const [numOfShares, setNumOfShares] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    // references to DOM elements
    const commentsRef = useRef()
    const commentInputContainerRef = useRef()
    const commentInputRef = useRef()

    useEffect(() => {
        const likesRef = db.collection(`posts/${postId}/likes`).orderBy("timestamp", "desc")
        const likesQuery = likesRef.where("postId", "==", postId)
        likesQuery.onSnapshot((snapshot) => {
            setLikes(snapshot.docs.reverse().map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
            var numLikes = 0
            snapshot.docs.map((doc) => {
                if ( doc.data().postId === postId ) {
                    numLikes++
                    if ( doc.data().user.email === currentUser.email ) {
                        setIsLiked(true)
                    }
                }
            })
            setNumOfLikes(numLikes)
        })

        const commentsRef = db.collection(`posts/${postId}/comments`).orderBy("timestamp", "desc")
        const commentsQuery = commentsRef.where("postId", "==", postId)
        commentsQuery.onSnapshot((snapshot) => {
            setComments(snapshot.docs.reverse().map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
            var numComments = 0
            snapshot.docs.map((doc) => {
                if ( doc.data().postId === postId ) {
                    numComments++
                }
            })
            setNumOfComments(numComments)
        })
    }, [])

    const processLike = () => {
        var isAlreadyLiked = false
        // check if the user has already liked this post
        likes.map(({data: { user }}) => {
            if ( user.email === currentUser.email ) {
                isAlreadyLiked = true
            }
        })
        const likesRef = db.collection(`posts/${postId}/likes`)
        // mark the post as liked if not already liked
        if ( !isAlreadyLiked ) {
            likesRef.add({
                postId: postId,
                user: currentUser,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        // mark the post as unliked
        else {
            const likesQuery = likesRef.where("postId", "==", postId)
                                .where("user.email", "==", currentUser.email)
            likesQuery.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => doc.ref.delete())
            }).catch((error) => console.log(error))
        }
    }

    const processComment = (e) => {
        e.preventDefault()
        db.collection(`posts/${postId}/comments`).add({
            postId: postId,
            content: commentInput,
            user: currentUser,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(error => alert(error))
        setCommentInput("")
        // ensure comments section is visible
        commentsRef.current.style.display = "block"
        commentInputContainerRef.current.style.paddingTop = "5px"
    }

    const processShare = () => {

    }

    const toggleCommentsDisplay = () => {
        if ( numOfComments == 0 ) {
            return
        }
        if ( commentsRef.current.style.display!== "none" ) {
            commentsRef.current.style.display = "none"
            commentInputContainerRef.current.style.paddingTop = "10px"
        }
        else {
            commentsRef.current.style.display = "block"
            commentInputContainerRef.current.style.paddingTop = "5px"
        }
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
                    <p>{numOfLikes} likes</p>
                </div>
                <div className="comments__shares__container">
                    <p onClick={toggleCommentsDisplay}>{comments?.length} comments</p>
                    <p>0 shares</p>
                </div>
            </div>
            <div className="post__buttons__container">
                <ReactionOption Icon={ThumbUpAltOutlinedIcon} text="Like" onClick={processLike} 
                    isLiked={isLiked}/>
                <ReactionOption Icon={ChatOutlinedIcon} text="Comment" 
                    onClick={() => {commentInputRef.current.focus()}} />
                <ReactionOption Icon={SharedOutlinedIcon} text="Share" 
                    onClick={() => {}} />
            </div>
            <div className="comments__container" style={{display: "none"}} ref={commentsRef}>
                <FlipMove>
                    {comments.map(({id, data: {user, content}}) => (
                        <CommentItem key={id} 
                                    imgSrc={user.photoURL} 
                                    userName={user.displayName} 
                                    content={content} />
                    ))}
                </FlipMove>
            </div>
            <div ref={commentInputContainerRef} style={{paddingTop: "10px"}} 
            className="comment__input__container">
                <Avatar src={currentUser.photoURL} style={{height: "30px", width: "30px"}} />
                <div className="comment__input">
                    <form>
                        <input ref={commentInputRef} value={commentInput} type="text" 
                        onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Write a comment..." />
                        <button onClick={processComment} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
})

export default Post
