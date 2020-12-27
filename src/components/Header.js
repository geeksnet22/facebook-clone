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
import './Header.css'
import { useDispatch } from 'react-redux'
import { logout } from '../features/userSlice'
import { auth } from '../Firebase';

function Header() {

    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch()

    const processSearch = e => {
        e.preventDefault()
    }

    const signout = () => {
        dispatch(logout())
        auth.signOut()
    }

    return (
        <div className="header">
            <div className="header__left">
                <Avatar src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"/>
                <div className="search__field">
                    <SearchIcon />
                    <form>
                        <input type="text" value={searchText} placeholder="Search Facebook" onChange={e => setSearchText(e.target.value)}/>
                        <button onClick={processSearch} type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div className="header__center">
                <HomeOutlinedIcon style={{color: "#ffffff"}}/>
                <PeopleAltOutlinedIcon style={{color: "#ffffff"}}/>
                <ShopTwoOutlinedIcon style={{color: "#ffffff"}}/>
                <SupervisedUserCircleOutlinedIcon style={{color: "#ffffff"}}/>
            </div>
            <div className="header__right">
                <div className="user_identity">
                    <Avatar />
                    <h4>Guri</h4>
                </div>
                <div className="header__right__icons">
                    <AddRoundedIcon />
                    <ChatBubbleRoundedIcon />
                    <NotificationsIcon />
                    <ArrowDropDownRoundedIcon onClick={signout}/>
                </div>
            </div>
        </div>
    )
}

export default Header
