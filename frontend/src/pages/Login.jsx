import React, { useState } from 'react';
import LoginForm from '../components/Login/login-form';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
    console.log('Username: ', username);
    console.log('Password: ', password);
  };

  return (
    <LoginForm
      username={username}
      password={password}
      onUsernameChange={handleUsernameChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
    />
  );
}
