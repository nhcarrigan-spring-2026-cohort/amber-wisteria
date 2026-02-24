import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PlusIcon from '../assets/plus.svg';
import JoinIcon from '../assets/join.svg';

import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import MealTrainSection from '../components/dashboard/MealTrainSection';

import axiosClient from '../api/axiosClient';

export default function UserDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showMoreCreated, setShowMoreCreated] = useState(false);
  const [showMoreJoined, setShowMoreJoined] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Fetch user + meal trains in parallel
        const [userRes, trainsRes] = await Promise.all([
          axiosClient.get('/api/me'),
          axiosClient.get('/api/mealtrains/')
        ]);

        const user = userRes.data;
        const mealTrains = trainsRes.data;

        // Split into created vs joined
        const created = mealTrains.filter(t => t.organizer_id === user.id);
        const joined = mealTrains.filter(t => t.organizer_id !== user.id);

        setData({
          user: { id: user.id, username: user.username },
          createdMealTrains: created,
          joinedMealTrains: joined
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

  if (loading) return <p className="p-10">Loading dashboard…</p>;
  if (error) return <p className="p-10">{error}</p>;

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
            items={data.createdMealTrains}
            extraItems={[]}
            showMore={showMoreCreated}
            toggleShowMore={() => setShowMoreCreated(p => !p)}
          />

          <MealTrainSection
            title="Joined Meal Trains"
            buttonLabel="Join"
            buttonIcon={JoinIcon}
            items={data.joinedMealTrains}
            extraItems={[]}
            showMore={showMoreJoined}
            toggleShowMore={() => setShowMoreJoined(p => !p)}
          />
        </main>
      </div>
    </div>
  );
}