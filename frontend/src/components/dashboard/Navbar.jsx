import logo from '../../assets/logo.png';
import NotifIcon from '../../assets/notif.svg';
import LogoutIcon from '../../assets/logout.svg';
import { useNavigate } from 'react-router';

export default function Navbar() {
  const iconFilter =
    'brightness(0) saturate(100%) invert(57%) sepia(82%) saturate(2471%) hue-rotate(1deg) brightness(101%) contrast(101%)';

  const hoverFilter =
    'brightness(0) saturate(100%) invert(17%) sepia(94%) saturate(7470%) hue-rotate(266deg) brightness(90%) contrast(102%)';

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  }

  return (
    <header className="w-full h-[70px] bg-[#fff7e0] flex justify-between items-center px-4 border-b-2 border-[#f5f2f2]">
      <img src={logo} alt="logo" className="w-[120px] p-1" />

      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={NotifIcon}
            className="w-5 h-5 cursor-pointer"
            style={{ filter: iconFilter }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = hoverFilter)}
            onMouseLeave={(e) => (e.currentTarget.style.filter = iconFilter)}
          />
          <span className="absolute -top-[2px] right-[2px] w-2 h-2 bg-red-600 rounded-full" />
        </div>

        <img
          src={LogoutIcon}
          className="w-5 h-5 cursor-pointer"
          style={{ filter: iconFilter }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = hoverFilter)}
          onMouseLeave={(e) => (e.currentTarget.style.filter = iconFilter)}
          onClick={handleLogout}
        />
      </div>
    </header>
  );
}
