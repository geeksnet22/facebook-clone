import React, { useState, useEffect, useRef, forwardRef } from 'react'
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

const NewMessageCreator = forwardRef(({selectedUsersForMessaging, 
                                        setSelectedUsersForMessaging, 
                                        openMessageCreator, 
                                        hideMessageCreator}, ref) => {

    const user = useSelector(selectUser)

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [username, setUsername] = useState("")
    const [messageContent, setMessageContent] = useState("")
    const [currentUserId, setCurrentUserId] = useState("")

    const contactSuggestionsRef = useRef()
    const messageCreatorRef = useRef()

    const { messageCreatorBodyRef, messageCreatorHeaderTitleRef,
            messageCreatorInputRef, messagesDisplayRef, messagesSectionRef } = ref

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
    }, [selectedUsersForMessaging])

    const processUserSelection = (userInfo) => {
        contactSuggestionsRef.current.style.display = "none"
        messagesSectionRef.current.style.display = "flex"
        messagesDisplayRef.current.style.display = "flex"
        setUsername(userInfo.displayName)
        selectedUsersForMessaging.push(userInfo)
        setSelectedUsersForMessaging(selectedUsersForMessaging)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        if ( selectedUsersForMessaging.length == 0 ) {
            alert("No user selected")
            return false
        }
        selectedUsersForMessaging.forEach(userInfo => {
            db.collection(`users/${currentUserId}/chats`).doc(`${userInfo.uid}`).set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            db.collection(`users/${userInfo.uid}/chats`).doc(`${currentUserId}`).set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            const sentMessagesReference = db.collection(`users/${currentUserId}/chats/${userInfo.uid}/messages`)
            sentMessagesReference.add({
                    type: "sent",
                    message: messageContent,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: userInfo
                }
            )
            const rcvdMessagesReference = db.collection(`users/${userInfo.uid}/chats/${currentUserId}/messages`)
            rcvdMessagesReference.add({
                    type: "received",
                    message: messageContent,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: {...user, uid: currentUserId}
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
        }
        else {
            contactSuggestionsRef.current.style.display = "flex"
            setFilteredUsers(users.filter(({data: {displayName}}) =>
                displayName.toLowerCase().includes(e.target.value.toLowerCase())))
        }
        setSelectedUsersForMessaging([])
    }
    
    return (
        <div ref={messageCreatorRef} className="newMessageCreator">
            <div ref={messageCreatorBodyRef} className="message__creation__body">
                <div className="top__portion">
                    <div className="message__header">
                        <p ref={messageCreatorHeaderTitleRef}>New Message</p>
                        <div className="close__icon__container" 
                            onClick={hideMessageCreator}>
                            <CloseIcon fontSize="default" style={{color: "#4267B2"}}/>
                        </div>
                    </div>
                    <div ref={messageCreatorInputRef} className="message__form__container">
                        <p>To:</p>
                        <form>
                            <input type="text" value={username} onChange={e => handleUsernameInput(e)} />
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
                            displayName={displayName}
                            email={email}
                            processUserSelection={processUserSelection}/>
                    ))}
                </div>
                <div ref={messagesSectionRef} className="messages__section">
                    <MessagesDisplay currentUserId={currentUserId} 
                                            targetUsers={selectedUsersForMessaging} 
                                            ref={messagesDisplayRef} />
                    <div className="message__input">
                        <form>
                            <input value={messageContent} placeholder="Type message here..." 
                                onChange={e => setMessageContent(e.target.value)} type="text"/>
                            <button onClick={sendMessage} type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="create__message__logo" 
                onClick={() => {
                                messagesDisplayRef.current.style.display = "none"
                                setUsername("")
                                openMessageCreator(true, "")
                                }} >
                <CreateIcon />
            </div>
        </div>
    )
})

export default NewMessageCreator
