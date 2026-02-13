import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PlusIcon from '../assets/plus.svg';
import JoinIcon from '../assets/join.svg';

import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import MealTrainSection from '../components/dashboard/MealTrainSection';

export default function UserDashboard() {
  const navigate = useNavigate();

  const [showMoreCreated, setShowMoreCreated] = useState(false);
  const [showMoreJoined, setShowMoreJoined] = useState(false);

  /* ---------- Data to be implemented here ---------- */

  const created = [
    {
      title: "Mihai's Meal Train",
      description: 'Mihai is sick so I made this meal train.'
    },
    {
      title: "Lore's Meal Train",
      description: 'Lore is sick so I made this meal train.'
    }
  ];

  const createdExtra = [
    {
      title: 'Extra Meal Train 1',
      description: 'More items shown when expanded.'
    },
    {
      title: 'Extra Meal Train 2',
      description: 'More items shown when expanded.'
    }
  ];

  const joined = [
    {
      title: "Akshar's Meal Train",
      description: 'Akshar is sick so I joined this meal train.'
    },
    {
      title: "Joaquin's Meal Train",
      description: 'Joaquin is sick so I joined this meal train.',
      pending: true
    }
  ];

  const joinedExtra = [
    {
      title: 'Extra Joined Train 1',
      description: 'More items shown when expanded.'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#fff8e3] font-[Inter]">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 m-2 p-10 rounded-2xl flex flex-col gap-10">
          <MealTrainSection
            title="Created Meal Trains"
            buttonLabel="Add"
            buttonIcon={PlusIcon}
            buttonAction={() => navigate('/create-meal-train')}
            items={created}
            extraItems={createdExtra}
            showMore={showMoreCreated}
            toggleShowMore={() => setShowMoreCreated((p) => !p)}
          />

          <MealTrainSection
            title="Joined Meal Trains"
            buttonLabel="Join"
            buttonIcon={JoinIcon}
            items={joined}
            extraItems={joinedExtra}
            showMore={showMoreJoined}
            toggleShowMore={() => setShowMoreJoined((p) => !p)}
          />
        </main>
      </div>
    </div>
  );
}
