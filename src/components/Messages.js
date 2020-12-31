import React from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import CreateIcon from '@material-ui/icons/Create'
import SearchIcon from '@material-ui/icons/Search'
import MessageItem from './MessageItem'
import './Messages.css'

function Messages() {
    return (
        <div className="messages">
            <div className="header">
                <h2>Messenger</h2>
                <div className="header__icons">
                    <MoreHorizIcon />
                    <FullscreenIcon />
                    <CreateIcon />
                </div>
            </div>
            <div className="search__container">
                <div className="form__container">
                    <SearchIcon style={{marginLeft: "5px", height:"20px", width:"20px"}} />
                    <form>
                        <input type="text" placeholder="Search Messenger"/>
                        <button>Search Contacts</button>
                    </form>
                </div>
            </div>
            <div className="message__items__container">
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
                <MessageItem imgSrc="" name="Gurinder Bhangu" lastMessage="hey man" />
            </div>
        </div>
    )
}

export default Messages