import { useNavigate } from 'react-router-dom';

import avatar from '../../assets/avatar.png';
import DashboardIcon from '../../assets/dashboard.svg';
import { orangeFilterConst } from './HoverIcon';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-[200px] py-10 px-5 flex flex-col items-center bg-[#f68300] text-white font-bold">
      <img src={avatar} alt="Avatar" className="w-[100px] rounded-full" />

      <p className="mt-4 mb-10 text-center">Welcome Anar!</p>

      <ul className="flex flex-col gap-3 w-full">
        <li
          onClick={() => navigate('/dashboard')}
          className="bg-white text-[#f68300] p-2 rounded flex justify-center items-center cursor-pointer"
        >
          <img src={DashboardIcon} className="w-5 h-5 mr-1" style={{ filter: orangeFilterConst }} />
          Dashboard
        </li>

        <li onClick={() => navigate('/dashboard')} className="p-2 hover:opacity-80 cursor-pointer">
          Created Meal Trains
        </li>

        <li onClick={() => navigate('/dashboard')} className="p-2 hover:opacity-80 cursor-pointer">
          Joined Meal Trains
        </li>

        <li
          onClick={() => navigate('/create-meal-train')}
          className="p-2 hover:opacity-80 cursor-pointer"
        >
          Create a Meal Train
        </li>

        <li
          onClick={() => navigate('/join-meal-train')}
          className="p-2 hover:opacity-80 cursor-pointer"
        >
          Join a Meal Train
        </li>
      </ul>
    </aside>
  );
}
