import React from 'react'
import { Avatar } from '@material-ui/core'
import SidebarItem from './SidebarItem'
import './Sidebar.css'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

function Sidebar() {

    const user = useSelector(selectUser)

    return (
        <div className="sidebar">
            <div className="user__identity">
                <Avatar src={user.photoURL} />
                <h4>{user.displayName?.split(" ")[0]}</h4>
            </div>
            <SidebarItem Icon={PeopleAltIcon} text="Friends"/>
            <SidebarItem Icon={PeopleAltIcon} text="Groups"/>
            <SidebarItem Icon={PeopleAltIcon} text="Marketplace"/>
            <SidebarItem Icon={PeopleAltIcon} text="Videos"/>
            <SidebarItem Icon={PeopleAltIcon} text="Events"/>
            <SidebarItem Icon={PeopleAltIcon} text="Memories"/>
        </div>
    )
}

export default Sidebar
