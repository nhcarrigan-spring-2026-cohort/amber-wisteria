import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

import ViewMealCard from '../components/view-meal-train/ViewMealCard';
import Navbar from '../components/dashboard/Navbar';
import Background from '../components/Background';
import ApprovalRequestPopup from '../components/view-meal-train/ApprovalRequestPopup';

export default function ViewMealTrain() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isApproved, setIsApproved] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    async function run() {
      try {
        const res = await axiosClient.get(`/api/mealtrains/${id}/`);
        const status = res.data.membership_status;

        if (status === 'owner' || status === 'approved') {
          setIsApproved(true);
        } else if (status === 'pending') {
          setIsApproved(false);
          setRequestSent(true);
        } else {
          setIsApproved(false);
        }
      } catch (err) {
        console.error(err);
        setIsApproved(false);
      }
    }

    run();
  }, [id]);

  const handleRequestApproval = async () => {
    try {
      await axiosClient.post(`/api/memberships/`, { meal_train: id });
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
