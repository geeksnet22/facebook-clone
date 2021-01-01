import React, { useState, useEffect, useRef } from 'react'
import './NewMessageCreator'
import CloseIcon from '@material-ui/icons/Close'
import CreateIcon from '@material-ui/icons/Create'
import './NewMessageCreator.css'
import { db } from '../Firebase'
import ContactItem from './ContactItem'

function NewMessageCreator() {

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [username, setUsername] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])
    const contactSuggestionsRef = useRef()

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => (
            setUsers(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    }, [])

    const handleUsernameInput = (e) => {
        setUsername(e.target.value)
        if (!e.target.value) {
            contactSuggestionsRef.current.style.display = "none"
        }
        else {
            contactSuggestionsRef.current.style.display = "flex"
            setFilteredUsers(users.filter(({data: {displayName}}) => 
                displayName.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    return (
        <div className="newMessageCreator">
            <div className="message__creation__body">
                <div className="top__portion">
                    <div className="message__header">
                        <p>New Message</p>
                        <CloseIcon fontSize="large" style={{color: "#4267B2"}} />
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
                    {filteredUsers.map(({id, data: {displayName, photoURL}}) => (
                        <ContactItem
                            key={id}
                            photoURL={photoURL}
                            name={displayName}/>
                    ))}
                </div>
            </div>
            <div className="create__message__logo">
                <CreateIcon />
            </div>
        </div>
    )
}

export default NewMessageCreator
