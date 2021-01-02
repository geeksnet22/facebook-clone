import React, { useState, useEffect, useRef } from 'react'
import './NewMessageCreator'
import CloseIcon from '@material-ui/icons/Close'
import CreateIcon from '@material-ui/icons/Create'
import { db } from '../Firebase'
import ContactItem from './ContactItem'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import firebase from 'firebase'
import MessagesDisplay from './MessagesDisplay'
import './NewMessageCreator.css'

function NewMessageCreator() {

    const user = useSelector(selectUser)

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [username, setUsername] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])
    const [messageContent, setMessageContent] = useState("")
    const [currentUserId, setCurrentUserId] = useState("")

    const messageCreationBodyRef = useRef()
    const contactSuggestionsRef = useRef()
    const messagesSectionRef = useRef()

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => {
            setUsers(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
            setCurrentUserId(snapshot.docs.filter(doc => (
                doc.data().email === user.email
            ))[0].id)
        })
    }, [])

    const processUserSelection = (userInfo) => {
        contactSuggestionsRef.current.style.display = "none"
        messagesSectionRef.current.style.display = "flex"
        setUsername(userInfo.name)
        selectedUsers.push(userInfo)
        setSelectedUsers(selectedUsers)
        // fetch messages messages for this users combination
        db.collection(`users/${currentUserId}/chats/${userInfo.uid}/receivedMessages`)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        if ( selectedUsers.length == 0 ) {
            alert("No user selected")
            return false
        }
        selectedUsers.forEach(userInfo => {
            const sentMessagesReference = db.collection(`users/${currentUserId}/chats/${userInfo.uid}/messages`)
            sentMessagesReference.add({
                    type: "sent",
                    message: messageContent,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
            )
            const rcvdMessagesReference = db.collection(`users/${userInfo.uid}/chats/${currentUserId}/messages`)
            rcvdMessagesReference.add({
                    type: "received",
                    message: messageContent,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
            )
        })
        setMessageContent("")
    }

    const handleUsernameInput = (e) => {
        messagesSectionRef.current.style.display = "none"
        setUsername(e.target.value)
        if (!e.target.value) {
            contactSuggestionsRef.current.style.display = "none"
            setSelectedUsers([])
        }
        else {
            contactSuggestionsRef.current.style.display = "flex"
            setFilteredUsers(users.filter(({data: {displayName}}) =>
                displayName.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }
    
    return (
        <div className="newMessageCreator">
            <div ref={messageCreationBodyRef} className="message__creation__body">
                <div className="top__portion">
                    <div className="message__header">
                        <p>New Message</p>
                        <div className="close__icon__container" 
                            onClick={() => {messageCreationBodyRef.current.style.display = "none"}}>
                            <CloseIcon fontSize="default" style={{color: "#4267B2"}}/>
                        </div>
                    </div>
                    <div className="message__form__container">
                        <p>To:</p>
                        <form>
                            <input type="text" value={username} onChange={e => handleUsernameInput(e)}/>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
                <div ref={contactSuggestionsRef} className="contact__suggestions">
                    {filteredUsers.map(({id, data: {displayName, email, photoURL}}) => (
                        <ContactItem
                            key={id}
                            uid={id}
                            photoURL={photoURL}
                            name={displayName}
                            email={email}
                            processUserSelection={processUserSelection}/>
                    ))}
                </div>
                <div ref={messagesSectionRef} className="messages__section">
                    {selectedUsers.length > 0 && <MessagesDisplay currentUserId={currentUserId} otherUserId={selectedUsers[0].uid} />}
                    <div className="message__input">
                        <form>
                            <input value={messageContent} placeholder="Type message here..." onChange={e => setMessageContent(e.target.value)} type="text"/>
                            <button onClick={sendMessage} type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="create__message__logo" 
                onClick={() => {messageCreationBodyRef.current.style.display = "flex"}} >
                <CreateIcon />
            </div>
        </div>
    )
}

export default NewMessageCreator
