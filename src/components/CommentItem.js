import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core'
import './CommentItem.css'

const CommentItem = forwardRef(({imgSrc, userName, content}, ref) => {
    return (
        <div ref={ref} className="commentItem">
            <Avatar style={{height: "30px", width:"30px"}} src={imgSrc} />
            <div className="content__container">
                <h5>{userName}</h5>
                <p>{content}</p>
            </div>
        </div>
    )
})

export default CommentItem
