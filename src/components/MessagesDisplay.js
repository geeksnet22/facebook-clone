import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { db } from '../Firebase'
import './MessagesDisplay.css'

function MessagesDisplay({ currentUserId, otherUserId }) {

    const user = useSelector(selectUser)
    const [messages, setMessages] = useState([])
    const messagesDisplayRef = useRef()

    useEffect(() => {
        db.collection(`users/${currentUserId}/chats/${otherUserId}/messages`)
        .orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setMessages(snapshot.docs.reverse().map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        })
    }, [])

    if (messagesDisplayRef.current){
        messagesDisplayRef.current.scrollTop = messagesDisplayRef.current.scrollHeight 
                                                - messagesDisplayRef.current.clientHeight;
    }
    
    return (
        <div ref={messagesDisplayRef} className="messagesDisplay">
            {messages.map(({id, data: {type, message, timestamp}}) => (
                    <div key={id} className={type} id="message__container">
                        <p>{message}</p>
                    </div>
            ))}
        </div>
    )
}

export default MessagesDisplay
