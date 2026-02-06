import './UserDashboard.css'

export default function UserDashboard() {
    return (
        <div className="dashboard-container">
            <aside className="dashboard-aside">
                <img src="" alt="Avatar" />
                <p>Welcome Anar!</p>
                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li>Created Meal Trains</li>
                        <li>Joined Meal Trains</li>
                        <li>Create Meal Train</li>
                    </ul>
                    </nav>
            </aside>
            <main className="dashboard-content">
                <section className="created-meal-trains">
                    <h1>Created Meal Trains</h1>
                    <button>Add</button>
                    <h2>Mihai's Meal Train</h2>
                    <p>Mihai is sick so i made this meal train.</p>
                    <h2>Lore's Meal Train</h2>
                    <p>Lore is sick so i made this meal train.</p>
                </section>
                <section className="joined-meal-trains">
                    <h1>Joined Meal Trains</h1>
                    <button>Join</button>
                    <h2>Akshar's Meal Train</h2>
                    <p>Akshar is sick so i made this meal train.</p>
                </section>
            </main>

        </div>
    )
}   