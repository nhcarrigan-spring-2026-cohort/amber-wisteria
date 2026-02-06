export default function UserDashboard() {
    return (
        <div className="dashboard-container">
            <asider className="dashboard-aide">
                <img src="" alt="Avatar" />
                <p>Welcome Anar!</p> Add the user's name
                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li>Created Meal Trains</li>
                        <li>Joined Meal Trains</li>
                        <li>Create Meal Train</li>
                    </ul>
                    </nav>
            </asider>
            <main className="created-meal-trains">
                <h1>Created Meal Trains</h1>
                <button>Add</button>
                <h2>Mihai's Meal Train</h2>
                <p>Mihai is sick so i made this meal train.</p>
                <h2>Lore's Meal Train</h2>
                <p>Lore is sick so i made this meal train.</p>
            </main>
            <main className="joined-meal-trains">
                <h1>Joined Meal Trains</h1>
                <button>Join</button>
                <h2>Akshar's Meal Train</h2>
                <p>Akshar is sick so i made this meal train.</p>
            </main>
        </div>
    )
}   