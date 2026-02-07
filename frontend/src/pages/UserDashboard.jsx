import './UserDashboard.css'
import avatar from '../assets/avatar.png'
import logo from '../assets/logo.png'

export default function UserDashboard() {
  return (
    <div className="dashboard-page">

      {/* FULL-WIDTH NAVBAR */}
      <header className="dashboard-navbar">
        <img src={logo} alt="logo" className="navbar-logo" />
        <div className="navbar-right">
          <span className="notification-dot"></span>
        </div>
      </header>

      {/* SIDEBAR + MAIN CONTENT */}
      <div className="dashboard-container">

        {/* SIDEBAR */}
        <aside className="dashboard-aside">
          <img src={avatar} alt="Avatar" />
          <p className="welcome-text">Welcome Anar!</p>

          <nav>
            <ul>
              <li className="active">Dashboard</li>
              <li>Created Meal Trains</li>
              <li>Joined Meal Trains</li>
              <li>Create a Meal Train</li>
              <li>Join a Meal Train</li>
            </ul>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dashboard-main">

          <div className="dashboard-content">

            {/* CREATED MEAL TRAINS */}
            <section className="card">
              <div className="card-header">
                <h1>Created Meal Trains</h1>
                <button>Add</button>
              </div>

              <div className="meal-train-item">
                <h2>Mihai's Meal Train</h2>
                <p>Mihai is sick so I made this meal train.</p>
              </div>

              <div className="meal-train-item">
                <h2>Lore's Meal Train</h2>
                <p>Lore is sick so I made this meal train.</p>
              </div>
            </section>

            {/* JOINED MEAL TRAINS */}
            <section className="card">
              <div className="card-header">
                <h1>Joined Meal Trains</h1>
                <button>Join</button>
              </div>

              <div className="meal-train-item">
                <h2>Akshar's Meal Train</h2>
                <p>Akshar is sick so I joined this meal train.</p>
              </div>

              <div className="meal-train-item">
                <h2>Joaquin's Meal Train</h2>
                <p>Joaquin is sick so I joined this meal train.</p>
              </div>
            </section>

          </div>
        </main>

      </div>
    </div>
  )
}