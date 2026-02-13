import React from 'react'
import './login-form.css'

export default function LoginForm({ email, password, onEmailChange, onPasswordChange, onSubmit }) { 
  return (
    <div className="login-page">
      <div className="elementOne" aria-hidden="true" />
      <div className="elementTwo" aria-hidden="true" />

      <main className="login-form" role="main">
        <h1 className="signin-heading" data-node-id="1:312">Sign in</h1>

        <form className="form" aria-label="Sign in form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email Address" value={email} onChange={onEmailChange} />

          <label className="sr-only" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" value={password} onChange={onPasswordChange} />

          <button type="submit" className="submit">Sign in</button>
          <p className="error-message" role="alert">
            Invalid email address or password 
          </p>    
          <p className="signup-text">
            Don't have an account yet? <a href="/signup">Sign up</a>  
          </p>    
        </form>
      </main>
    </div>
  )
}

