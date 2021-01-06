import React, { useRef } from 'react'
import LikesPopoutItem from './LikesPopoutItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectLikes, hideLikes } from '../features/likesSlice'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import CloseIcon from '@material-ui/icons/Close'
import { selectUser } from '../features/userSlice'
import './LikesPopout.css'

function LikesPopout() {

    const currentUser = useSelector(selectUser)
    const dispatch = useDispatch()
    const postLikes = useSelector(selectLikes)
    const likesPopoutContainerRef = useRef()

    if ( postLikes.length > 0 ) {
      likesPopoutContainerRef.current.style.display = "block"
    }

    const closeLikesPopout = () => {
      likesPopoutContainerRef.current.style.display = "none"
      dispatch(hideLikes())
    }

    return (
        <div>
          <div ref={likesPopoutContainerRef} className="likesPopout">
            <div className="likes__popout__header">
              <div className="likes__container">
                <ThumbUpIcon style={{height: "15px", width: "15px", padding: "5px", 
                        borderRadius: "50%", backgroundColor: "#4267B2"}} />
                <p style={{color: "#4267B2"}}>{postLikes.length}</p>
              </div>
              <div className="popout__close__container" onClick={closeLikesPopout} >
                <CloseIcon />
              </div>
            </div>
            <div className="likes__info__container">
              {postLikes.map(({id, email, displayName, photoURL}) => (
                <LikesPopoutItem key={id} imgSrc={photoURL} displayName={displayName}
                        isCurrentUser={email === currentUser.email} />
              ))}
            </div>
          </div>
        </div>
    )
}

export default LikesPopout
