import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Contacts from './components/Contacts'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import { auth, db } from './Firebase'
import LikesPopoutItem from './components/LikesPopoutItem'
import { hideLikes, selectLikes } from './features/likesSlice'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import CloseIcon from '@material-ui/icons/Close'
import Dropdown from './components/Dropdown'
import Messages from './components/Messages'
import NewMessageCreator from './components/NewMessageCreator'

function App() {

  const currentUser = useSelector(selectUser)
  const postLikes = useSelector(selectLikes)
  const dispatch = useDispatch()

  const [currentUserId, setCurrentUserId] = useState("")
  const [selectedUsersForMessaging, setSelectedUsersForMessaging] = useState([])

  const likesPopoutContainerRef = useRef()
  const bodyRef = useRef()
  const dropdownRef = useRef()
  const messagesRef = useRef()

  const messageCreatorBodyRef = useRef()
  const messageCreatorHeaderTitleRef = useRef()
  const messageCreatorInputRef = useRef()

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //user is logged in
        // send user info into redux store
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL
          })
        )
        db.collection("users").onSnapshot((snapshot) => {
          setCurrentUserId(snapshot.docs.filter(doc => doc.data().email === userAuth.email)[0]?.id)
        })
      }
      else {
        //user is not logged in
        dispatch(logout())
      }

      if ( dropdownRef.current ) {
        dropdownRef.current.style.display = "none"
      }
    })
  }, [])
  
  if ( postLikes.length > 0 ) {
    likesPopoutContainerRef.current.style.display = "block"
  }

  const closeLikesPopout = () => {
    likesPopoutContainerRef.current.style.display = "none"
    dispatch(hideLikes())
  }

  const toggleDropdown = () => {
    if ( dropdownRef.current.style.display === "block" ) {
      dropdownRef.current.style.display = "none"
    }
    else {
      dropdownRef.current.style.display = "block"
    }
  }

  const toggleMessagesMenu = () => {
    if ( messagesRef.current.style.display === "block" ) {
      messagesRef.current.style.display = "none"
    }
    else {
      messagesRef.current.style.display = "block"
    }
  }

  const openMessageCreator = (isNewMessage, messagedUser) => {
    if( !isNewMessage ) {
      messageCreatorHeaderTitleRef.current.innerHTML = messagedUser.displayName
      messageCreatorInputRef.current.style.display = "none"
      setSelectedUsersForMessaging([messagedUser])
    }
    else {
      messageCreatorHeaderTitleRef.current.innerHTML = "New Message"
      messageCreatorInputRef.current.style.display = "flex"
      setSelectedUsersForMessaging([])
    }
    messagesRef.current.style.display = "none"
    messageCreatorBodyRef.current.style.display = "flex"
    if ( window.innerWidth <= 500 ) {
      messageCreatorBodyRef.current.style.height = "300px"
      messageCreatorBodyRef.current.style.width = "260px"
    }
    else {
      messageCreatorBodyRef.current.style.height = "450px"
      messageCreatorBodyRef.current.style.width = "350px"
    }
  }

  const hideMessageCreator = () => {
    messageCreatorBodyRef.current.style.display = "none"
  }

  return (
    <div className="app">
      {!currentUser ? (
        <Login />
      ) : (
        <>
          <Header toggleDropdown={toggleDropdown} 
                    toggleMessagesMenu={toggleMessagesMenu} />
          <div ref={bodyRef} className="body">
            <Sidebar />
            <Feed />
            <Contacts />
          </div>
          <Dropdown ref={dropdownRef}/>
          <NewMessageCreator selectedUsersForMessaging={selectedUsersForMessaging}
                              setSelectedUsersForMessaging={setSelectedUsersForMessaging} 
                              openMessageCreator={openMessageCreator} 
                              hideMessageCreator={hideMessageCreator} 
                              ref={{
                                  messageCreatorBodyRef: messageCreatorBodyRef,
                                  messageCreatorHeaderTitleRef: messageCreatorHeaderTitleRef,
                                  messageCreatorInputRef: messageCreatorInputRef
                                  }}/>
          {currentUserId && <Messages currentUserId={currentUserId} 
                                openMessageCreator={openMessageCreator} 
                                ref={messagesRef} />}
          <div ref={likesPopoutContainerRef} className="likes__popout__container">
            <div className="likes__popout__header">
              <div className="likes__container">
                <ThumbUpIcon style={{height: "15px", width: "15px", padding: "5px", 
                        borderRadius: "50%", backgroundColor: "#4267B2"}} />
                <p style={{color: "#4267B2"}}>{postLikes.length}</p>
              </div>
              <div className="popout__close__container" onClick={closeLikesPopout} >
                <CloseIcon />
              </div>
            </div>
            <div className="likes__info__container">
              {postLikes.map(({id, email, displayName, photoURL}) => (
                <LikesPopoutItem key={id} imgSrc={photoURL} displayName={displayName}
                        isCurrentUser={email === currentUser.email} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
