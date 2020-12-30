import { Avatar } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import FeedbackIcon from '@material-ui/icons/Feedback'
import SettingsIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import './Dropdown.css'
import DropdownItem from './DropdownItem'
import { useDispatch } from 'react-redux'
import { logout } from '../features/userSlice'
import { auth } from '../Firebase'


const Dropdown = forwardRef((props, ref) => {
    
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const signout = () => {
        dispatch(logout())
        auth.signOut()
    }

    return (
        <div ref={ref} className="dropdown">
            <div className="user__info__container">
                <Avatar src={user.photoURL} 
                    style={{marginLeft: "10px", height: "50px", width: "50px"}}/>
                <div className="name__container">
                    <h4>{user.displayName}</h4>
                    <p>See your profile</p>
                </div>
            </div>
            <div className="feedback__container">
                <DropdownItem Icon={FeedbackIcon} text="Give Feedback" subText="Help us improve the new facebook" isArrow={false}/>
            </div>
            <DropdownItem Icon={SettingsIcon} text="Settings & privacy" isArrow={true} />
            <DropdownItem Icon={HelpIcon} text="Help & Support" isArrow={true} />
            <DropdownItem Icon={Brightness2Icon} text="Display & Accessibility" isArrow={true} />
            <DropdownItem Icon={ExitToAppIcon} text="Log Out" isArrow={false} onClick={signout}/>
        </div>
    )
})

export default Dropdown
