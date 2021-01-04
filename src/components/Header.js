import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import ShopTwoOutlinedIcon from '@material-ui/icons/ShopTwoOutlined'
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import HeaderIcons from './HeaderIcons';
import './Header.css'

function Header({ toggleDropdown, toggleMessagesMenu }) {

    const user = useSelector(selectUser)
    const [searchText, setSearchText] = useState("")

    const processSearch = e => {
        e.preventDefault()
    }

    return (
        <div className="header" id="pageHeader">
            <div className="header__left">
                <Avatar style={{height: "40px"}} src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"/>
                <div className="search__field">
                    <SearchIcon />
                    <form>
                        <input type="text" value={searchText} placeholder="Search Facebook" onChange={e => setSearchText(e.target.value)}/>
                        <button onClick={processSearch} type="submit"></button>
                    </form>
                </div>
            </div>
            <div className="header__center">
                <HeaderIcons Icon={HomeOutlinedIcon}/>
                <HeaderIcons Icon={PeopleAltOutlinedIcon}/>
                <HeaderIcons Icon={ShopTwoOutlinedIcon}/>
                <HeaderIcons Icon={SupervisedUserCircleOutlinedIcon}/>
            </div>
            <div className="header__right">
                <div className="user__identity">
                    <Avatar style={{height: "37px", width: "37px"}} src={user.photoURL}/>
                    <h4>{user.displayName?.split(" ")[0]}</h4>
                </div>
                <div className="header__right__icons">
                    <AddRoundedIcon />
                    <ChatBubbleRoundedIcon onClick={toggleMessagesMenu}/>
                    <NotificationsIcon />
                    <ArrowDropDownRoundedIcon onClick={toggleDropdown}/>
                </div>
            </div>
        </div>
    )
}

export default Header
