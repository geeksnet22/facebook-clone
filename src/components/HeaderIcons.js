import React from 'react'

function HeaderIcons({ Icon }) {
    return (
        <div className="headerOption" style={{display: "flex", justifyContent: "center"}}>
            <Icon fontSize="large" style={{color: "#ffffff"}}/>
        </div>
    )
}

export default HeaderIcons
