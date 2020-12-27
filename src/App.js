import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Contacts from './components/Contacts'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, login, logout } from './features/userSlice'
import { auth } from './Firebase'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log("useEffect " + userAuth.displayName)
        //user is logged in
        // send user info to redux store
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL
          })
        )
      }
      else {
        //user is not logged in
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="body">
            <Sidebar />
            <Feed />
            <Contacts />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
