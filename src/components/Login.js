import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import { auth } from '../Firebase'
import './Login.css'

function Login() {

    const [name, setName] = useState("")
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
            displaName: userAuth.user.displayName,
            photoURL: userAuth.user.photoURL
        })))
    }

    const register = (e) => {
        e.preventDefault()
        if (!name) {
            return alert("Full name is required for sign up")
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then(userAuth => { userAuth.user.updateProfile({
            displayName: name,
            photoURL: photoURL
        }).then(
            dispatch(login(
                {
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displaName: name,
                    photoURL: photoURL
                }
            ))
        )
        }).catch(error => alert(error))
    }

    return (
        <div className="login">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png" alt=""/>
            <form>
                <input type="text" placeholder="Full Name (Required for sign up)" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Profile Photo URL" value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={signin}>Log In</button>
                <button type="submit" onClick={register}>Sign Up</button>
            </form>
        </div>
    )
}

export default Login