import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import { auth, db } from './Firebase'
import Dropdown from './components/Dropdown'
import Messages from './components/Messages'
import NewMessageCreator from './components/NewMessageCreator'
import LikesPopout from './components/LikesPopout'
import UserProfile from './components/UserProfile'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './components/Home'

function App() {

  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()

  const [currentUserId, setCurrentUserId] = useState("")
  const [selectedUsersForMessaging, setSelectedUsersForMessaging] = useState([])

  const dropdownRef = useRef()
  const messagesRef = useRef()

  const messageCreatorBodyRef = useRef()
  const messageCreatorHeaderTitleRef = useRef()
  const messageCreatorInputRef = useRef()
  const messagesDisplayRef = useRef()
  const messagesSectionRef = useRef()

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        // send user info into redux store
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL
          })
        )
        db.collection("users").where("email", "==", userAuth.email)
        .get()
        .then((snapshot) => (
          setCurrentUserId(snapshot.docs[0].id)
        ))
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
    messagesRef.current.style.display = "none"
    messageCreatorBodyRef.current.style.display = "flex"
    if( !isNewMessage ) {
      messagesSectionRef.current.style.display = "flex"
      messagesDisplayRef.current.style.display = "flex"
      messageCreatorHeaderTitleRef.current.innerHTML = messagedUser.displayName
      messageCreatorInputRef.current.style.display = "none"
      setSelectedUsersForMessaging([messagedUser])
    }
    else {
      messageCreatorHeaderTitleRef.current.innerHTML = "New Message"
      messageCreatorInputRef.current.style.display = "flex"
      setSelectedUsersForMessaging([])
    }
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
          <Dropdown ref={dropdownRef}/>
          <NewMessageCreator selectedUsersForMessaging={selectedUsersForMessaging}
                              setSelectedUsersForMessaging={setSelectedUsersForMessaging} 
                              openMessageCreator={openMessageCreator} 
                              hideMessageCreator={hideMessageCreator}
                              ref={{
                                  messageCreatorBodyRef: messageCreatorBodyRef,
                                  messageCreatorHeaderTitleRef: messageCreatorHeaderTitleRef,
                                  messageCreatorInputRef: messageCreatorInputRef,
                                  messagesDisplayRef: messagesDisplayRef,
                                  messagesSectionRef: messagesSectionRef
                                  }}/>
          {currentUserId && <Messages currentUserId={currentUserId} 
                                openMessageCreator={openMessageCreator} 
                                ref={messagesRef} />}
          <LikesPopout />
          <Router>
            <Switch>
              <Route path="/" exact render={(props) => <Home openMessageCreator={openMessageCreator} />} />
              <Route path="/user/:id" render={(props) => (currentUser && <UserProfile {...props}/>)} />
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
