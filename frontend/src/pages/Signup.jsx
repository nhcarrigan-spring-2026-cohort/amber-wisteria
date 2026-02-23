import Background from '../components/Background';
import PasswordHelper from '../components/signUp/PasswordHelper';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordGuidelines, setPasswordGuidelines] = useState('');
  const [confirmGuideline, setConfirmGuideline] = useState('');
  const [usernameGuideline, setUsernameGuideline] = useState('');
  const [emailGuideline, setEmailGuideline] = useState('');

  const userRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const res = await axiosClient.post('/api/auth/register', {
          username: username,
          password: password,
          email: email
        });
        console.log(res.data);
        console.log(res.data.refresh);
        console.log(res.data.access);

        const refreshToken = res.data.refresh;
        const accessToken = res.data.access;
        localStorage.setItem('refresh', refreshToken);
        localStorage.setItem('access', accessToken);

        navigate('/dashboard');
      } catch (err) {
        console.log(err);
      }
      console.log('Form Submitted:', username, email, password, confirmPassword);
    } else {
      alert('Passwords must match.');
    }
  };

  const handleFocus = () => {
    return (
      <div>
        {setPasswordGuidelines(
          'Password must contain at least one uppercase and lowercase letter, one number, and at least 8 characters.'
        )}
      </div>
    );
  };

  return (
    <Background>
      <div className="flex items-center justify-center h-screen w-full">
        <form
          onSubmit={handleSubmit}
          className="relative z-3 bg-[#FFECC899] rounded-4xl shadow-xl pt-14 pr-22 pb-14 pl-22 flex flex-col box-border items-center"
        >
          <h1
            id="create-account"
            className="font-semibold mb-8 text-[45px]! text-[#212B27] dark:text-[#212B27]"
          >
            Create An Account
          </h1>

          <label htmlFor="username" className="dark:text-[#212B27]">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            ref={userRef}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUsernameGuideline('Must be at least 3 characters.')}
            onBlur={() => setUsernameGuideline('')}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]"
            placeholder="Username"
            minLength="3"
            aria-describedby="userNote"
            required
          />

          <p id="userNote" className="w-95 ">
            {usernameGuideline}
          </p>

          <label htmlFor="email" className="dark:text-[#212B27]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailGuideline('Enter an email, eg. john@example.com')}
            onBlur={() => setEmailGuideline('')}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]"
            placeholder="Email"
            aria-describedby="emailNote"
            required
          />

          <p id="emailNote" className="w-95 ">
            {emailGuideline}
          </p>

          <label htmlFor="password" className="dark:text-[#212B27]">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleFocus}
            onBlur={() => setPasswordGuidelines('')}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]"
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            aria-describedby="passNote"
            minLength="8"
          />

          <p id="passNote" className="w-95 ">
            {passwordGuidelines}
          </p>

          <label htmlFor="confirmPassword" className="dark:text-[#212B27]">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setConfirmGuideline('Passwords must match.')}
            onBlur={() => setConfirmGuideline('')}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]"
            placeholder="Confirm Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            aria-describedby="confirmNote"
            minLength="8"
          />

          <p id="confirmNote" className="w-95 ">
            {confirmGuideline}
          </p>

          <button
            type="submit"
            className="bg-[#A88DE5]! text-white! w-xs mt-8 mb-2 p-5! text-2xl! font-semibold!"
          >
            Create Account
          </button>

          <p className="dark:text-[#212B27]">
            Already Have An Account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </Background>
  );
}
