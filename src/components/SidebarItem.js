import React from 'react'

function SidebarItem({ Icon, text }) {
    return (
        <div className="sidebarItem" style={{display: "flex", alignItems: "center", 
            marginBottom: "20px"}}>
            <Icon style={{color: "#ffffff"}}/>
            <h4 style={{marginLeft: "10px", color: "#ffffff"}}>{text}</h4>
        </div>
    )
}

export default SidebarItem
