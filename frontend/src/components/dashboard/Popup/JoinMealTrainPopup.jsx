import { useState } from 'react';
import './JoinMealTrainPopup.css';

export default function JoinMealTrainPopup({ isOpen, onClose, onSubmit }) {
  const [mealTrainUrl, setMealTrainUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mealTrainUrl);
    setMealTrainUrl('');
  };

  if (!isOpen) return null;

  return (
    <div className="popup-background" onClick={onClose}>
      <div className="popup-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M35 28.75C35 30.4076 34.3415 31.9973 33.1694 33.1694C31.9973 34.3415 30.4076 35 28.75 35H11.25C9.5924 35 8.00269 34.3415 6.83058 33.1694C5.65848 31.9973 5 30.4076 5 28.75V15H35V28.75ZM26.51 19.115C26.3939 18.9986 26.2559 18.9062 26.1041 18.8432C25.9522 18.7802 25.7894 18.7478 25.625 18.7478C25.4606 18.7478 25.2978 18.7802 25.1459 18.8432C24.9941 18.9062 24.8561 18.9986 24.74 19.115L18.125 25.7325L15.26 22.865L15.0625 22.705C14.8038 22.531 14.4895 22.46 14.1812 22.5058C13.8728 22.5517 13.5928 22.711 13.3959 22.9527C13.199 23.1944 13.0995 23.5009 13.1169 23.8121C13.1343 24.1233 13.2674 24.4168 13.49 24.635L17.24 28.385C17.3561 28.5014 17.4941 28.5938 17.6459 28.6568C17.7978 28.7198 17.9606 28.7522 18.125 28.7522C18.2894 28.7522 18.4522 28.7198 18.6041 28.6568C18.7559 28.5938 18.8939 28.5014 19.01 28.385L26.51 20.885C26.6264 20.7689 26.7188 20.6309 26.7818 20.4791C26.8448 20.3272 26.8772 20.1644 26.8772 20C26.8772 19.8356 26.8448 19.6728 26.7818 19.5209C26.7188 19.3691 26.6264 19.2311 26.51 19.115ZM28.75 5C30.4076 5 31.9973 5.65848 33.1694 6.83058C34.3415 8.00269 35 9.5924 35 11.25V12.5H5V11.25C5 9.5924 5.65848 8.00269 6.83058 6.83058C8.00269 5.65848 9.5924 5 11.25 5H28.75Z"
              fill="white"
            />
          </svg>
          <h2 className="popup-title">Join Meal Train</h2>
        </div>
        <form className="popup-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="mealTrainUrl" className="input-label">
              Meal Train URL
            </label>
            <input
              id="mealTrainUrl"
              type="url"
              value={mealTrainUrl}
              onChange={(e) => setMealTrainUrl(e.target.value)}
              placeholder="https://meal-train/id=1"
              className="url-input"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="join-btn">
              Join
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
