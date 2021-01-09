import React from 'react'
import Contacts from './Contacts'
import Feed from './Feed'
import Sidebar from './Sidebar'
import './Home.css'

function Home({ openMessageCreator }) {
    return (
        <div className="home">
            <Sidebar />
            <Feed />
            <Contacts openMessageCreator={openMessageCreator}/>
        </div>
    )
}

export default Home
