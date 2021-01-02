import React from 'react'
import { Avatar } from '@material-ui/core'
import './ContactItem.css'

function ContactItem({ uid, photoURL, name, email, processUserSelection }) {
    return (
        <div className="contactItem" 
            onClick={() => processUserSelection({
                    uid: uid,
                    name: name, 
                    email: email, 
                    photoURL: photoURL
                })}>
            <Avatar src={photoURL}/>
            <h4>{name}</h4>
        </div>
    )
}

export default ContactItem
