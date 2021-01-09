import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import Post from './Post'
import './UserFeed.css'

function UserFeed( {user} ) {

    
    const [input, setInput] = useState("")
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection("posts").where("user.uid", "==", user.uid).orderBy("timestamp", "desc").onSnapshot((snapshot) => (
            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    })

    const sendPost = (e) => {
        e.preventDefault()
        db.collection("posts").add({
            user: user,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(error => alert(error))
        setInput("")
    }


    return (
        <div className="userFeed">
            <div className="feed__input__container">
                <Avatar src={user.photoURL} />
                <div className="feed__input">
                    <form>
                        <input value={input} type="text" onChange={(e) => {setInput(e.target.value)}} 
                            placeholder={`What's on your mind, ${user.displayName?.split(' ')[0] || 'user'}?`} />
                        <button onClick={sendPost} type="submit"></button>
                    </form>
                </div>
            </div>
            <FlipMove>
                {posts.map(({id, data: {message, user}}) => (
                    <Post key={id}
                        postId={id}
                        message={message}
                        user={user}
                    />
                ))}
            </FlipMove>
        </div>
    )
}

export default UserFeed