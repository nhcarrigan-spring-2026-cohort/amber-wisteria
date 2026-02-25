import './LoginForm.css';
import Background from '../Background';
import { Link } from 'react-router-dom';

export default function LoginForm({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  message
}) {
  return (
    <Background>
      <div className="login-page">

        <main className="login-form" role="main">
          <h1 className="signin-heading" data-node-id="1:312">
            Sign in
          </h1>

          <form className="form" aria-label="Sign in form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={onUsernameChange}
              required
              minLength="3"
              title="Username must be at least 3 characters"
            />

            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
              minLength="8"
            />

            <button type="submit" className="submit">
              Sign in
            </button>

            {message && (
              <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                {message}
              </p>
            )}

            <p className="signup-text">
              Don't have an account yet? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </main>
      </div>
    </Background>
  );
}
