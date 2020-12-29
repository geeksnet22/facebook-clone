import { Avatar } from '@material-ui/core'
import firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import Post from './Post'
import './Feed.css'
import { db } from '../Firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import FlipMove from 'react-flip-move';

function Feed() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState("")
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => (
            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ))
    }, []);

    const sendPost = (e) => {
        e.preventDefault()
        setInput("")
        db.collection("posts").add({
            name: user.displayName,
            message: input,
            photoURL: user.photoURL || '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(error => alert(error))
    }

    return (
        <div className="feed">
            <div className="feed__input__container">
                <Avatar src={user.photoURL} />
                <div className="feed__input">
                    <form>
                        <input value={input} type="text" onChange={(e) => setInput(e.target.value)} 
                            placeholder={`What's on your mind, ${user.displayName?.split(' ')[0] || 'user'}?`} />
                        <button onClick={sendPost} type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <FlipMove>
                {posts.map(({id, data: {name, message, photoURL}}) => (
                    <Post key={id}
                        postId={id}
                        name={name}
                        message={message}
                        photoURL={photoURL}
                    />
                ))}
            </FlipMove>
        </div>
    )
}

export default Feed
