import Background from '../components/Background';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      console.log('Form Submitted:', name, email, password, confirmPassword);
      alert(`Registered user: ${name}`);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
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

          <label htmlFor="name" className="dark:text-[#212B27]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]"
            placeholder="Name"
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
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]"
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
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]"
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
            className="bg-white p-2.5 w-12/10 rounded-xl mt-2.5 mb-2.5 h-16 border-none outline-hidden dark:text-[#212B27]"
            placeholder="Confirm Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
            minLength="8"
          />

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
