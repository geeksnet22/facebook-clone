import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { db } from '../Firebase'
import './MessagesDisplay.css'

const MessagesDisplay = forwardRef(({ currentUserId, targetUsers }, ref) => {

    const [messages, setMessages] = useState([])
    const messagesDisplayRef = useRef()

    useEffect(() => {
        if (targetUsers && targetUsers.length > 0) {
            db.collection(`users/${currentUserId}/chats/${targetUsers[0].uid}/messages`)
            .orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setMessages(snapshot.docs.reverse().map((doc) => {
                return(
                {
                    id: doc.id,
                    data: doc.data()
                })
            }))})
        }
    }, [targetUsers.length, targetUsers[0]])

    if (messagesDisplayRef.current){
        messagesDisplayRef.current.scrollTop = messagesDisplayRef.current.scrollHeight 
                                                - messagesDisplayRef.current.clientHeight;
    }
    
    return (
        <div ref={messagesDisplayRef} className="messagesDisplay">
            <div ref={ref} className="display__container">
                {messages.map(({id, data: {type, message, timestamp}}) => {
                        return <div key={id} className={type} id="message__container">
                            <p>{message}</p>
                        </div>
            })}
            </div>
        </div>
    )
})

export default MessagesDisplay
