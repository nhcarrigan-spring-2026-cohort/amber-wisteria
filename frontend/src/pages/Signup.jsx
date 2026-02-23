import Background from '../components/Background';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

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
      alert('Passwords must match');
    }
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
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27] placeholder:font-semibold placeholder:text-[#999]"
            placeholder="Username"
            required
          />

          <label htmlFor="email" className="dark:text-[#212B27]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27] placeholder:font-semibold placeholder:text-[#999]"
            placeholder="Email"
            required
          />

          <label htmlFor="password" className="dark:text-[#212B27]">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27] placeholder:font-semibold placeholder:text-[#999]"
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
            minLength="8"
          />

          <label htmlFor="confirmPassword" className="dark:text-[#212B27]">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27] placeholder:font-semibold placeholder:text-[#999]"
            placeholder="Confirm Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
            minLength="8"
          />

          <button
            type="submit"
            className="bg-[#A88DE5]! text-white! w-[391.187px] h-[90.51px] rounded-[23.011px] text-[larger] cursor-pointer mt-8 mb-2 p-[1.53px]"
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
