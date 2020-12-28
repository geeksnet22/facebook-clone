import React from 'react'
import './ReactionOption.css'

function ReactionOption({ Icon, text }) {
    return (
        <div className="reactionOption">
            <Icon />
            <p>{text}</p>
        </div>
    )
}

export default ReactionOption
