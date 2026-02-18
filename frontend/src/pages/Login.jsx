import React, { useState } from 'react';
import LoginForm from '../components/Login/login-form';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginCredentials = {
      username: email,
      password: password
    };

    try {
      const res = await axiosClient.post('/api/auth/login', loginCredentials);
      console.log(res);

      const refreshToken = res.data.refresh;
      const accessToken = res.data.access;
      localStorage.setItem('refresh', refreshToken);
      localStorage.setItem('access', accessToken);

      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
    />
  );
}
