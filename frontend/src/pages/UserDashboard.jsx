import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PlusIcon from '../assets/plus.svg';
import JoinIcon from '../assets/join.svg';

import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import MealTrainSection from '../components/dashboard/MealTrainSection';
import axiosClient from '../api/axiosClient';

import { fetchDashboard } from '../api/dashboard';

export default function UserDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showMoreCreated, setShowMoreCreated] = useState(false);
  const [showMoreJoined, setShowMoreJoined] = useState(false);

  /* ---------- Data to be implemented here ---------- */

  useEffect(() => {
    axiosClient
      .get('/api/me')
      .then((response) => {
        console.log('Server response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchDashboard()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load dashboard');
        setLoading(false);
      });
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
            toggleShowMore={() => setShowMoreCreated((p) => !p)}
          />

          <MealTrainSection
            title="Joined Meal Trains"
            buttonLabel="Join"
            buttonIcon={JoinIcon}
            items={data.joinedMealTrains}
            extraItems={[]}
            showMore={showMoreJoined}
            toggleShowMore={() => setShowMoreJoined((p) => !p)}
          />
        </main>
      </div>
    </div>
  );
}
