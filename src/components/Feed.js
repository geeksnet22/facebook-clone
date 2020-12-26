import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import Post from './Post'
import './Feed.css'

function Feed() {

    const [input, setInput] = useState()
    const [posts, setPosts] = useState()

    const sendPost = (e) => {
        e.preventDefault()
    }

    return (
        <div className="feed">
            <div className="feed__input__container">
                <Avatar />
                <div className="feed__input">
                    <form>
                        <input size="50" type="text" onChange={(e) => setInput(e.target.value)} placeholder="What's on your mind, Guri?" />
                        <button onClick={sendPost} type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <Post name="Guri Singh" message="This is a test message" photoUrl=""/>
            <Post name="Guri Singh" message="This is a test message" photoUrl=""/>
            {/* {posts.map()} */}
        </div>
    )
}

export default Feed
