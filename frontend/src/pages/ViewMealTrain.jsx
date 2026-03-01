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

  const [membershipStatus, setMembershipStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const res = await axiosClient.get(`/api/mealtrains/${id}/memberships/`);
        if (res.data.length === 0) {
          setMembershipStatus('none');
        } else {
          setMembershipStatus(res.data[0].status); // "pending", "approved", "rejected", "owner"
        }
      } catch (err) {
        console.error(err);
        setMembershipStatus('none');
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [id]);

  const handleRequestApproval = async () => {
    try {
      await axiosClient.post(`/api/mealtrains/${id}/memberships/`);
      setMembershipStatus('pending');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <>
      <Navbar />
      <Background>
        {membershipStatus === 'none' && (
          <ApprovalRequestPopup
            onRequest={handleRequestApproval}
            onCancel={() => navigate('/dashboard')}
            requestSent={false}
            inviterName="Organizer"
            mealTrainName="Meal Train"
          />
        )}

        {membershipStatus === 'pending' && (
          <ApprovalRequestPopup
            onRequest={handleRequestApproval}
            onCancel={() => navigate('/dashboard')}
            requestSent={true}
            inviterName="Organizer"
            mealTrainName="Meal Train"
          />
        )}

        {(membershipStatus === 'approved' || membershipStatus === 'owner') && <ViewMealCard />}

        {membershipStatus === 'rejected' && (
          <p className="text-center text-red-600 mt-10">Your request was rejected.</p>
        )}
      </Background>
    </>
  );
}
