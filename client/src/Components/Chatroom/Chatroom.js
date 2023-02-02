import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import './Chatroom.scss'

import Messages from '../Messages/Messages';

const socket = io('http://localhost:3001');


export default function Chatroom(props) {
  const messageInitialState = {user: props.username, message: ''};

  const [message, setMessage] = useState(messageInitialState);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(props.username);

  const handleChange = (e) => {
    const newMessage = {
      user: props.username,
      message: e.target.value
    }

    setMessage(newMessage);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.message) {
      socket.emit('sendMessage', message);
      setMessage(messageInitialState);
    }
  };


  useEffect(() => {
    const handler = (chatMessage => {
      const newMessage = {
        user: chatMessage.user,
        message: chatMessage.message, 
        key: chatMessage.key
      };

      setMessages(chatMessages => [...chatMessages, newMessage]);
    });

    socket.on('receiveMessage', handler);

    return () => socket.off('receiveMessage', handler);
  }, [])

  return (
    <div className='chat-container'>
      <Messages messages={messages} currentUser={currentUser} />
      <form className='chat-form' onSubmit={sendMessage}>
        <input onChange={handleChange} placeholder="Press Enter to Send" value={message.message}></input>
        <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
      </form>
    </div>
  )
}
