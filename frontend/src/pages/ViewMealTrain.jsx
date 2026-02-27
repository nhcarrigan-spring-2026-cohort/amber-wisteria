import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

import ViewMealCard from '../components/view-meal-train/ViewMealCard';
import Navbar from '../components/dashboard/Navbar';
import Background from '../components/Background';
import ApprovalRequestPopup from '../components/view-meal-train/ApprovalRequestPopup';

export default function ViewMealTrain() {
  const navigate = useNavigate();

  const [isApproved, setIsApproved] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const checkMembership = async () => {
    try {
      const me = await axiosClient.get('/api/me');
      const currentUserId = me.data.id;

      const res = await axiosClient.get(`/api/memberships/`);

      const myMembership = res.data.find((m) => m.user_id === currentUserId);

      if (!myMembership) {
        setIsApproved(false);
      } else if (myMembership.status === 'approved') {
        setIsApproved(true);
      } else {
        setIsApproved(false);
        setRequestSent(true);
      }
    } catch (err) {
      console.error(err);
      setIsApproved(false);
    }
  };

  useEffect(() => {
    const run = async () => {
      await checkMembership();
    };
    run();
  }, []);

  const handleRequestApproval = async () => {
    try {
      await axiosClient.post(`/api/memberships/`);
      setRequestSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (isApproved === null) return null;

  return (
    <>
      <Navbar />
      <Background>
        {!isApproved && (
          <ApprovalRequestPopup
            onRequest={handleRequestApproval}
            onCancel={() => navigate('/dashboard')}
            requestSent={requestSent}
            inviterName="Organizer"
            mealTrainName="Meal Train"
          />
        )}

        {isApproved && <ViewMealCard />}
      </Background>
    </>
  );
}
