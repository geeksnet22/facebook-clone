import React from 'react'
import { Avatar } from '@material-ui/core'
import './ContactItem.css'

function ContactItem({ uid, photoURL, displayName, 
                        email, processUserSelection,
                        openMessageCreator }) {
    return (
        <div className="contactItem" 
            onClick={() => processUserSelection ? processUserSelection({
                    uid: uid,
                    displayName: displayName, 
                    email: email, 
                    photoURL: photoURL
                }) : openMessageCreator(false, 
                                            {
                                                uid: uid,
                                                displayName: displayName, 
                                                email: email, 
                                                photoURL: photoURL
                                            })}>
            <Avatar src={photoURL}/>
            <h4>{displayName}</h4>
        </div>
    )
}

export default ContactItem
