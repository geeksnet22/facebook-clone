import React, { useEffect } from 'react'
import './NewMessageCreator'
import CloseIcon from '@material-ui/icons/Close'
import CreateIcon from '@material-ui/icons/Create'
import './NewMessageCreator.css'

function NewMessageCreator() {

    useEffect(() => {
    }, [])

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
                            <input type="text"/>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
                <div className="contact__suggestions">
                    
                </div>
            </div>
            <div className="create__message__logo">
                <CreateIcon />
            </div>
        </div>
    )
}

export default NewMessageCreator
