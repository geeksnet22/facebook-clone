import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import { auth, db } from '../Firebase'
import firebase from 'firebase'
import './Login.css'

function Login() {

    const [displayName, setName] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const signin = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => dispatch(login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoURL: userAuth.user.photoURL
        }))).catch(error => alert(error))
    }

    const register = (e) => {
        e.preventDefault()
        if (!displayName) {
            return alert("Full displayName is required for sign up")
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then(userAuth => { userAuth.user.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        }).then(() => {
            dispatch(login(
                {
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: displayName,
                    photoURL: photoURL
                }
            ))
        }).then(db.collection("users").doc(`${userAuth.user.uid}`).set({
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }))}).catch(error => alert(error))
    }

    return (
        <div className="login">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png" alt=""/>
            <form>
                <input type="text" placeholder="Full Name (Required for sign up)" value={displayName} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Profile Photo URL" value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
                <input type="email" placeholder="Email (Anything resembling an email)" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={signin}>Log In</button>
                <p>Not a member yet? <span onClick={register}>Sign up</span></p>
            </form>
        </div>
    )
}

export default Login