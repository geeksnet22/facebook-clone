import React from 'react'

function SidebarItem({ Icon, text }) {
    return (
        <div className="sidebarItem" style={{display: "flex", alignItems: "center"}}>
            <Icon fontSize="large" style={{color: "#ffffff"}}/>
            <h4 style={{marginLeft: "15px", color: "#ffffff"}}>{text}</h4>
        </div>
    )
}

export default SidebarItem
