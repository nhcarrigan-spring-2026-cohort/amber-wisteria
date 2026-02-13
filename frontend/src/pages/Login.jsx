import React, { useState } from 'react'
import LoginForm from '../components/Login/login-form'  

export default function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  } 

  const handlePasswordChange = (e) => {
  setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Form submitted!')
    console.log('Email: ', email)
    console.log('Password: ', password)

  }


  return (
    <LoginForm 
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
    />
  )
}