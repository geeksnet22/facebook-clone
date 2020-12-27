import React from 'react'
import { Avatar } from '@material-ui/core'
import './ContactItem.css'

function ContactItem({ imgSrc, name }) {
    return (
        <div className="contactItem">
            <Avatar src={imgSrc}/>
            <h4>{name}</h4>
        </div>
    )
}

export default ContactItem
