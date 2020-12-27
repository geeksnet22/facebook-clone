import React from 'react'
import { Avatar } from '@material-ui/core'
import './ContactItem.css'

function ContactItem({ photoURL, name }) {
    return (
        <div className="contactItem">
            <Avatar src={photoURL}/>
            <h4>{name}</h4>
        </div>
    )
}

export default ContactItem
