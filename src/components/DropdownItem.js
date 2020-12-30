import React from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './DropdownItem.css'

function DropdownItem({ Icon, text, subText, isArrow, onClick }) {
    return (
        <div className="dropdownItem" onClick={onClick}>
            <div className="left__portion">
                <Icon style={{marginLeft: "10px", padding: "8px", 
                    borderRadius: "50%", backgroundColor: "gray"}} />
                <div className="text__portion">
                    <h4>{text}</h4>
                    {subText && <p>{subText}</p>}
                </div>  
            </div>
            {isArrow && <ArrowForwardIosIcon style={{marginRight: "5px"}}/>}
        </div>
    )
}

export default DropdownItem
