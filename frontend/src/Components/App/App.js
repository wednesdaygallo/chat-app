import { useState } from 'react';

import Chatroom from '../Chatroom/Chatroom';
import Login from '../Login/Login';

import './App.scss';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleUsername = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  }



  return isLoggedIn ? <Chatroom username={username} /> : <Login handleUsername={handleUsername} />; 
}

export default App;
