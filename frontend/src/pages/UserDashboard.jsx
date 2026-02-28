import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PlusIcon from '../assets/plus.svg';
import JoinIcon from '../assets/join.svg';

import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import MealTrainSection from '../components/dashboard/MealTrainSection';
import JoinMealTrainPopup from '../components/dashboard/Popup/JoinMealTrainPopup';
import axiosClient from '../api/axiosClient';

export default function UserDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showMoreCreated, setShowMoreCreated] = useState(false);
  const [showMoreJoined, setShowMoreJoined] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // 1. User + all meal trains
        const [userRes, trainsRes] = await Promise.all([
          axiosClient.get('/api/me'),
          axiosClient.get('/api/mealtrains/')
        ]);

        const user = userRes.data;
        const mealTrains = trainsRes.data;

        // 2. Split created vs joined
        const created = mealTrains.filter((t) => t.organizer_id === user.id);
        const joined = mealTrains.filter((t) => t.organizer_id !== user.id);

        // 3. Fetch membership for each joined train
        const joinedWithMemberships = await Promise.all(
          joined.map(async (train) => {
            try {
              const res = await axiosClient.get(
                `/api/mealtrains/${train.id}/memberships/`
              );

              const membership = res.data[0] || null;

              return {
                ...train,
                membershipStatus: membership?.status || null,
                membershipId: membership?.id || null
              };
            } catch {
              return {
                ...train,
                membershipStatus: null,
                membershipId: null
              };
            }
          })
        );

        setData({
          user: { id: user.id, username: user.username },
          createdMealTrains: created,
          joinedMealTrains: joinedWithMemberships
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard');
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // 4. Cancel pending membership
  const handleCancel = async (membershipId) => {
    try {
      await axiosClient.delete(`/api/memberships/${membershipId}/`);

      setData((prev) => ({
        ...prev,
        joinedMealTrains: prev.joinedMealTrains.filter(
          (t) => t.membershipId !== membershipId
        )
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Leave an approved meal train
  const handleLeave = async (membershipId) => {
    try {
      await axiosClient.delete(`/api/memberships/${membershipId}/`);

      setData((prev) => ({
        ...prev,
        joinedMealTrains: prev.joinedMealTrains.filter(
          (t) => t.membershipId !== membershipId
        )
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-10">Loading dashboard…</p>;
  if (error) return <p className="p-10">{error}</p>;

  const createdFirstTwo = data.createdMealTrains.slice(0, 2);
  const createdExtra = data.createdMealTrains.slice(2);

  const joinedFirstTwo = data.joinedMealTrains.slice(0, 2);
  const joinedExtra = data.joinedMealTrains.slice(2);

  return (
    <div className="flex flex-col h-screen bg-[#fff8e3] font-[Inter]">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar user={data.user} />

        <main className="flex-1 m-2 p-10 rounded-2xl flex flex-col gap-10">
          <MealTrainSection
            title="Created Meal Trains"
            buttonLabel="Add"
            buttonIcon={PlusIcon}
            buttonAction={() => navigate('/create-meal-train')}
            items={createdFirstTwo}
            extraItems={createdExtra}
            showMore={showMoreCreated}
            toggleShowMore={() => setShowMoreCreated((p) => !p)}
          />

          <MealTrainSection
            title="Joined Meal Trains"
            buttonLabel="Join"
            buttonIcon={JoinIcon}
            buttonAction={() => setIsPopupOpen(true)}
            items={joinedFirstTwo}
            extraItems={joinedExtra}
            showMore={showMoreJoined}
            toggleShowMore={() => setShowMoreJoined((p) => !p)}
            onCancel={handleCancel}
            onLeave={handleLeave}   // NEW
          />
        </main>
      </div>

      <JoinMealTrainPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={(url) => {
          try {
            const parsed = new URL(url);
            const path = parsed.pathname;
            navigate(path);
          } catch {
            navigate(url);
          }
          setIsPopupOpen(false);
        }}
      />
    </div>
  );
}