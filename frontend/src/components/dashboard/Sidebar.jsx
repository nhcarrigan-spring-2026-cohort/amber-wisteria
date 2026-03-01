import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import avatar from '../../assets/avatar.png';
import DashboardIcon from '../../assets/dashboard.svg';
import { orangeFilterConst } from './HoverIcon.constants';

export default function Sidebar({ user, onOpenJoinPopup }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden w-full bg-[#f68300] text-white flex justify-between items-center p-4">
        <p className="font-bold">Welcome {user.username}!</p>
        <button onClick={() => setOpen(!open)} className="text-white text-2xl">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-[#f68300] text-white font-bold flex flex-col items-center px-5
          fixed top-0 left-0 w-[200px] h-full z-50 transition-transform duration-300
          pt-16
          ${open ? 'translate-x-0' : '-translate-x-full'}
          
          /* Desktop overrides */
          md:static md:translate-x-0 md:h-screen md:pt-10
        `}
      >
        <img src={avatar} alt="Avatar" className="w-[100px] rounded-full" />

        <p className="mt-4 mb-10 text-center hidden md:block">Welcome {user.username}!</p>

        <ul className="flex flex-col gap-3 w-full">
          <li
            onClick={() => {
              navigate('/dashboard');
              setOpen(false);
            }}
            className="bg-white text-[#f68300] p-2 rounded flex justify-center items-center cursor-pointer"
          >
            <img
              src={DashboardIcon}
              className="w-5 h-5 mr-1"
              style={{ filter: orangeFilterConst }}
            />
            Dashboard
          </li>

          <li
            onClick={() => {
              navigate('/create-meal-train');
              setOpen(false);
            }}
            className="p-2 hover:opacity-80 cursor-pointer"
          >
            Create a Meal Train
          </li>

          <li
            onClick={() => {
              onOpenJoinPopup();
              setOpen(false);
            }}
            className="p-2 hover:opacity-80 cursor-pointer"
          >
            Join a Meal Train
          </li>
        </ul>
      </aside>
    </>
  );
}
