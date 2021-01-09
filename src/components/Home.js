import React from 'react'
import Contacts from './Contacts'
import Feed from './Feed'
import Sidebar from './Sidebar'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <Sidebar />
            <Feed />
            <Contacts />
        </div>
    )
}

export default Home
