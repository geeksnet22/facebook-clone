import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { db } from '../Firebase'
import ContactItem from './ContactItem'
import './Contacts.css'

function Contacts({ openMessageCreator }) {
    const user = useSelector(selectUser)
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => (
            setContacts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ));
    }, [])
    
    return (
        <div className="contacts">
            <h2>Contacts</h2>
            {contacts.map(({id, data: {displayName, email, photoURL}}) => (
                email !== user.email && <ContactItem key={id}
                            uid={id}
                            email={email}
                            displayName={displayName}
                            photoURL={photoURL}
                            openMessageCreator={openMessageCreator}/>
            ))}
        </div>
    )
}

export default Contacts
