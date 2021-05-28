import React, { forwardRef } from 'react'
import './Message.css'

const Message = forwardRef((props, ref) => {

    const isUser = props.username === props.text.username

    return (
        <div ref={ref} className={isUser ? "message_cardRight" : "message_cardLeft"}>
            <div className='username'>
                {isUser ? '' : props.text.username}
            </div>
            <div className={isUser ? "message_userCard" : "message_guestCard"} >

                <div>
                    {props.text.message}
                </div>
            </div>
        </div>
    )
})

export default Message;
