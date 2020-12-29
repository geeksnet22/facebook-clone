import React from 'react'
import './ReactionOption.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

function ReactionOption({ Icon, text, onClick, isLiked }) {
    const likedString = isLiked ? "liked" : ""
    const classes = `reactionOption ${likedString}`
    return (
        <div className={classes} onClick={onClick}>
            { isLiked && <ThumbUpAltIcon fontSize="small"/> }
            { !isLiked && <Icon fontSize="small"/> }
            <p>{text}</p>
        </div>
    )
}

export default ReactionOption
