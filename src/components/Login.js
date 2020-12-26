import React, { useState } from 'react'
import './Login.css'

function Login() {

    const [name, setName] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const processLogin = (e) => {
        e.preventDefault()
    }

    return (
        <div className="login">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png" alt=""/>
            <form>
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Profile Photo URL" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e => e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e => e.target.value)} />
                <button type="submit" onClick={processLogin}>Log In</button>
            </form>
        </div>
    )
}

export default Login