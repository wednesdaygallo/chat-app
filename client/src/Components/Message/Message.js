import React from 'react'

import './Message.scss'

export default function Message({ message, currentUser }) {
  return (
    <li className={currentUser === message.user ? "message current-user": "message other-users"}>
      <p className="text">{message.message}</p>
      <span className='user'>{message.user}</span>
    </li>
  )
}
