import Background from '../components/Background';
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
  const [serverErrors, setServerErrors] = useState({});

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
        console.log('STATUS:', err.response?.status);
        console.log('DATA:', err.response?.data);
        if (err.response?.data) {
          setServerErrors(err.response.data);
        }
      }
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
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <form
          onSubmit={handleSubmit}
          className="relative z-3 bg-[#FFECC899] rounded-4xl shadow-xl px-6 sm:px-12 md:px-20 py-6 md:py-12 flex flex-col box-border items-center"
        >
          <h1
            id="create-account"
            className="font-semibold mb-8 text-4xl md:text-5xl text-[#212B27] dark:text-[#212B27]"
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
            className="bg-white p-3 w-full rounded-xl mt-2 mb-4 h-16 border-none outline-hidden dark:text-[#212B27] placeholder:font-semibold placeholder:text-[#999]"
            placeholder="Username"
            minLength="3"
            aria-describedby="userNote"
            required
          />

          <p id="userNote" className="w-95 bg-[#FEB058] rounded-2xl">
            {usernameGuideline}
          </p>

          {serverErrors.username && (
            <p className="w-95 bg-red-400 text-white rounded-2xl mt-2 p-2">
              {serverErrors.username[0]}
            </p>
          )}

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
            className="bg-white p-3 w-full rounded-xl mt-2 mb-4 h-16 border-none outline-hidden dark:text-[#212B27] placeholder:font-semibold placeholder:text-[#999]"
            placeholder="Email"
            aria-describedby="emailNote"
            required
          />

          <p id="emailNote" className="w-95 bg-[#FEB058] rounded-2xl">
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
            className="bg-white p-3 w-full rounded-xl mt-2 mb-4 h-16 border-none outline-hidden dark:text-[#212B27] placeholder:font-semibold placeholder:text-[#999]"
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            aria-describedby="passNote"
            minLength="8"
          />

          <p id="passNote" className="w-95 bg-[#FEB058] rounded-2xl">
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
            className="bg-white p-3 w-full rounded-xl mt-2 mb-4 h-16 border-none outline-hidden dark:text-[#212B27] placeholder:font-semibold placeholder:text-[#999]"
            placeholder="Confirm Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            aria-describedby="confirmNote"
            minLength="8"
          />

          <p id="confirmNote" className="w-95 bg-[#FEB058] rounded-2xl">
            {confirmGuideline}
          </p>

          <button
            type="submit"
            className="bg-[#A88DE5]! text-white! w-[70%] max-w-md rounded-xl text-[larger] cursor-pointer mt-6 mb-2 py-6"
          >
            Create Account
          </button>

          <p className="dark:text-[#212B27] text-[21.477px] text-[#32403b] font-sans font-semibold">
            Already Have An Account?{' '}
            <Link to="/login" className="hover:text-[#A88DE5]">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Background>
  );
}
