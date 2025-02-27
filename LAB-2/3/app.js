// Import the study planner module
const { addSession, listTodaySessions, sessionCountdown, fetchStudyMaterials } = require("./studyPlanner");

// Example usage
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to take user input for adding a study session
function promptAddSession() {
    readline.question(
        "Enter topic, session time (YYYY-MM-DD HH:MM), and duration in minutes (e.g., 'Math 2023-10-25 14:30 60'): ",
        (input) => {
            const [topic, dateStr, timeStr, durationStr] = input.split(" ");
            const sessionTime = new Date(`${dateStr}T${timeStr}:00`);
            const duration = parseInt(durationStr);

            // Add the study session
            addSession(topic, sessionTime, duration);

            // Set up a countdown for the session
            const session = { topic, sessionTime, duration };
            sessionCountdown(session);

            // Ask if the user wants to add another session
            readline.question("Add another session? (yes/no): ", (answer) => {
                if (answer.toLowerCase() === "yes") {
                    promptAddSession();
                } else {
                    // List today's sessions
                    listTodaySessions();

                    // Prompt for fetching study materials
                    promptFetchStudyMaterials();
                }
            });
        }
    );
}

// Function to take user input for fetching study materials
function promptFetchStudyMaterials() {
    readline.question("Enter a topic to fetch study materials (e.g., 'Math'): ", async (topic) => {
        try {
            const materials = await fetchStudyMaterials(topic);
            console.log(`Study materials for ${topic}:`);
            console.log(materials);
        } catch (error) {
            console.error(`Error fetching study materials: ${error}`);
        } finally {
            readline.close();
        }
    });
}

// Start the prompt
promptAddSession();