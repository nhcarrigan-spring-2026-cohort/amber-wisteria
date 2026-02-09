import { useState } from "react";
import './UserDashboard.css';
import avatar from '../assets/avatar.png';
import logo from '../assets/logo.png';

import NotifIcon from "../assets/notif.svg";
import LogoutIcon from "../assets/logout.svg";
import PlusIcon from "../assets/plus.svg";
import JoinIcon from "../assets/join.svg";
import DashboardIcon from "../assets/dashboard.svg";
import WaitingIcon from "../assets/waiting.svg";
import XIcon from "../assets/x.svg";

export default function UserDashboard() {

  const [showMoreCreated, setShowMoreCreated] = useState(false);
  const [showMoreJoined, setShowMoreJoined] = useState(false);

  return (
    <div className="dashboard-page">

      <header className="dashboard-navbar">
        <img src={logo} alt="logo" className="navbar-logo" />

        <div className="navbar-right">
          <div className="notif-wrapper">
            <img src={NotifIcon} alt="notifications" className="notif-icon" />
            <span className="notification-dot"></span>
          </div>

          <img src={LogoutIcon} alt="logout" className="logout-icon" />
        </div>
      </header>

      <div className="dashboard-container">

        <aside className="dashboard-aside">
          <img src={avatar} alt="Avatar" />
          <p className="welcome-text">Welcome Anar!</p>

          <nav>
            <ul>
              <li className="active">
                <img src={DashboardIcon} alt="dashboard" className="dashboard-icon" />
                Dashboard
              </li>
              <li>Created Meal Trains</li>
              <li>Joined Meal Trains</li>
              <li>Create a Meal Train</li>
              <li>Join a Meal Train</li>
            </ul>
          </nav>
        </aside>

        <main className="dashboard-main">

          <div className="dashboard-content">

            {/* CREATED MEAL TRAINS */}
            <section className="card">
              <div className="card-header">
                <h1>Created Meal Trains</h1>
                <button className="icon-btn">
                  <img src={PlusIcon} alt="plus" className="plus-icon" />
                  Add
                </button>
              </div>

              <div className="meal-train-item-wrapper">
                <div className="meal-train-item">
                  <h2>Mihai's Meal Train</h2>
                  <p>Mihai is sick so I made this meal train.</p>
                </div>
              </div>

              <div className="meal-train-item-wrapper">
                <div className="meal-train-item">
                  <h2>Lore's Meal Train</h2>
                  <p>Lore is sick so I made this meal train.</p>
                </div>
              </div>

              {showMoreCreated && (
                <>
                  <div className="meal-train-item-wrapper">
                    <div className="meal-train-item">
                      <h2>Extra Meal Train 1</h2>
                      <p>More items shown when expanded.</p>
                    </div>
                  </div>

                  <div className="meal-train-item-wrapper">
                    <div className="meal-train-item">
                      <h2>Extra Meal Train 2</h2>
                      <p>More items shown when expanded.</p>
                    </div>
                  </div>
                </>
              )}

              <button
                className="show-more-btn"
                onClick={() => setShowMoreCreated(prev => !prev)}
              >
                {showMoreCreated ? (
                  <>
                    Show less <span className={`chevron ${showMoreCreated ? "open" : ""}`}>˅</span>
                  </>
                ) : (
                  <>
                    Show more <span className={`chevron ${showMoreCreated ? "open" : ""}`}>˅</span>
                  </>
                )}
              </button>
            </section>

            {/* JOINED MEAL TRAINS */}
            <section className="card">
              <div className="card-header">
                <h1>Joined Meal Trains</h1>

                <button className="icon-btn">
                  <img src={JoinIcon} alt="join" className="join-icon" />
                  Join
                </button>
              </div>

              <div className="meal-train-item-wrapper">
                <div className="meal-train-item">
                  <h2>Akshar's Meal Train</h2>
                  <p>Akshar is sick so I joined this meal train.</p>
                </div>
              </div>

              <div className="meal-train-item-wrapper">
                <div className="meal-train-item pending">
                  <div>
                    <h2>Joaquin's Meal Train</h2>
                    <p>Joaquin is sick so I joined this meal train.</p>
                  </div>

                  <div className="pending-icons">
                    <img src={WaitingIcon} alt="waiting" className="pending-icon waiting" />
                    <img src={XIcon} alt="remove" className="pending-icon remove" />
                  </div>
                </div>
              </div>

              {showMoreJoined && (
                <>
                  <div className="meal-train-item-wrapper">
                    <div className="meal-train-item">
                      <h2>Extra Joined Train 1</h2>
                      <p>More items shown when expanded.</p>
                    </div>
                  </div>
                </>
              )}

              <button
                className="show-more-btn"
                onClick={() => setShowMoreJoined(prev => !prev)}
              >
                {showMoreJoined ? (
                  <>
                    Show less <span className={`chevron ${showMoreCreated ? "open" : ""}`}>˅</span>
                  </>
                ) : (
                  <>
                    Show more <span className={`chevron ${showMoreCreated ? "open" : ""}`}>˅</span>
                  </>
                )}
              </button>
            </section>

          </div>
        </main>

      </div>
    </div>
  );
}