import logo from '../../assets/logo.png';
import NotifIcon from '../../assets/notif.svg';
import LogoutIcon from '../../assets/logout.svg';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';

import NotificationsPopup from '../dashboard/NotificationsPopup';

export default function Navbar({ variant = 'default' }) {
  const navigate = useNavigate();
  const isLanding = variant === 'landing';

  const [openNotif, setOpenNotif] = useState(false);
  const [mealTrainIds, setMealTrainIds] = useState([]);

  const iconFilter =
    'brightness(0) saturate(100%) invert(57%) sepia(82%) saturate(2471%) hue-rotate(1deg) brightness(101%) contrast(101%)';

  const hoverFilter =
    'brightness(0) saturate(100%) invert(17%) sepia(94%) saturate(7470%) hue-rotate(266deg) brightness(90%) contrast(102%)';

  useEffect(() => {
    async function load() {
      try {
        const me = await axiosClient.get('/api/me');
        const userId = me.data.id;

        const res = await axiosClient.get('/api/mealtrains/');
        const mine = res.data.filter((mt) => mt.organizer_id === userId);

        setMealTrainIds(mine.map((mt) => mt.id));
      } catch (err) {
        console.error(err);
      }
    }

    if (!isLanding) {
      load();
    }
  }, [isLanding]);

  function handleLogout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  }

  return (
    <header className="w-full h-[70px] flex justify-between items-center px-8 bg-[#fff7e0] border-b border-[#f0e6cc]">
      <img
        src={logo}
        alt="logo"
        className="w-[130px] cursor-pointer"
        onClick={() => navigate('/')}
      />

      {isLanding ? (
        <button
          onClick={() => navigate('/create-meal-train')}
          className="bg-[#f68300] text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:brightness-95 transition"
        >
          Start a meal train
        </button>
      ) : (
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={NotifIcon}
              className="w-5 h-5 cursor-pointer transition"
              style={{ filter: iconFilter }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = hoverFilter)}
              onMouseLeave={(e) => (e.currentTarget.style.filter = iconFilter)}
              onClick={() => setOpenNotif((prev) => !prev)}
            />

            <span className="absolute -top-[2px] right-[2px] w-2 h-2 bg-red-600 rounded-full" />

            {openNotif && (
              <NotificationsPopup close={() => setOpenNotif(false)} mealTrainIds={mealTrainIds} />
            )}
          </div>

          <img
            src={LogoutIcon}
            className="w-5 h-5 cursor-pointer transition"
            style={{ filter: iconFilter }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = hoverFilter)}
            onMouseLeave={(e) => (e.currentTarget.style.filter = iconFilter)}
            onClick={handleLogout}
          />
        </div>
      )}
    </header>
  );
}
