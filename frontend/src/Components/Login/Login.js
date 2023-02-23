import React, { useState } from 'react'

import './Login.scss'

export default function Login(props) {
  const [user, setUser] = useState('');

  const handleChange = (e) => {
    setUser(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      props.handleUsername(user);
      setUser('');
    }
  }

  return (
    <div className="login">
      <h1>React Chat App</h1>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Enter Username" value={user} onChange={handleChange} autoComplete="off"></input>
        <button>Submit</button>
      </form>
    </div>
  )
}
