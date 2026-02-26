import { useEffect, useRef, useState } from 'react';
import axiosClient from '../../api/axiosClient';

import HoverIcon from './HoverIcon';
import XIcon from '../../assets/x.svg';
import CheckIcon from '../../assets/check.svg';
import { redFilter } from './HoverIcon.constants';

const darkGreenFilter =
  'brightness(0) saturate(100%) invert(27%) sepia(93%) saturate(800%) hue-rotate(92deg) brightness(85%) contrast(90%)';

export default function NotificationsPopup({ close, mealTrainIds = [] }) {
  const popupRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleClick(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [close]);

  useEffect(() => {
    async function load() {
      try {
        let allPending = [];

        for (const id of mealTrainIds) {
          const res = await axiosClient.get(`/api/mealtrains/${id}/memberships/`);

          const pending = res.data
            .filter((m) => m.status === 'pending')
            .map((m) => ({
              id: m.id,
              message: `User ${m.user_id} requested to join your meal train.`
            }));

          allPending = [...allPending, ...pending];
        }

        setNotifications(allPending);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [mealTrainIds]);

  async function handleAction(id, action) {
    try {
      await axiosClient.post(`/api/memberships/${id}/${action}/`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      ref={popupRef}
      className="absolute right-0 top-7 w-80 bg-white shadow-lg rounded-2xl overflow-hidden z-50 font-[Karla]"
    >
      <div className="bg-[#f68300] text-white px-4 py-2 rounded-t-2xl">
        <h3 className="font-semibold text-lg">Notifications</h3>
      </div>

      <div className="p-4">
        {loading && <p>Loading…</p>}

        {!loading && notifications.length === 0 && (
          <p className="text-gray-500 text-sm">No notifications right now.</p>
        )}

        <div className="flex flex-col gap-3">
          {notifications.map((n) => (
            <div key={n.id} className="flex justify-between items-center bg-white p-3 rounded-xl">
              <p className="text-sm text-left pr-4">{n.message}</p>

              <div className="flex gap-4 items-center">
                <HoverIcon
                  src={CheckIcon}
                  alt="accept"
                  base={darkGreenFilter}
                  hover={darkGreenFilter}
                  className="w-8 h-8"
                  onClick={() => handleAction(n.id, 'approve')}
                />

                <HoverIcon
                  src={XIcon}
                  alt="decline"
                  base={redFilter}
                  hover={redFilter}
                  className="w-6 h-6"
                  onClick={() => handleAction(n.id, 'reject')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
