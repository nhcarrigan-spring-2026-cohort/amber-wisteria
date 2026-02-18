export async function fetchDashboard() {
  // This is a mock API for now 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: "Lore" },
        createdMealTrains: [
          {
            id: 1,
            title: "Mihai's Meal Train",
            description: "Mihai is sick so I made this meal train."
          },
          {
            id: 2,
            title: "Lore's Meal Train",
            description: "Lore is sick so I made this meal train."
          }
        ],
        joinedMealTrains: [
          {
            id: 10,
            title: "Akshar's Meal Train",
            description: "Akshar is sick so I joined this meal train.",
            pending: true
          }
        ]
      });
    }, 800);
  });
}