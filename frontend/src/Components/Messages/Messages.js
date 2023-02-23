import React, { useState } from 'react'

import './Messages.scss'

import Message from '../Message/Message'

export default function Messages({ messages, currentUser }) {

  return (
    <div className="messages-container">
      <ul>
        {messages.map(msg => {
          return <Message message={msg} key={msg.key} currentUser={currentUser} />;
        })}
      </ul>
    </div>
  )
}
