// Array to store study sessions
let studySessions = [];

// Function to add a new study session
function addSession(topic, sessionTime, duration) {
    try {
        // Validate topic
        if (!topic || typeof topic !== "string") {
            throw new Error("Invalid topic. Please provide a non-empty string.");
        }

        // Validate sessionTime (must be a valid Date object)
        if (!(sessionTime instanceof Date) || isNaN(sessionTime.getTime())) {
            throw new Error("Invalid session time. Please provide a valid Date object.");
        }

        // Validate duration (must be a positive number)
        if (typeof duration !== "number" || duration <= 0) {
            throw new Error("Invalid duration. Please provide a positive number.");
        }

        // Add the session to the array
        studySessions.push({ topic, sessionTime, duration });
        console.log(`Study session added: ${topic} at ${sessionTime.toLocaleString()} for ${duration} minutes.`);
    } catch (error) {
        console.error(`Error adding study session: ${error.message}`);
    }
}

// Function to list today's study sessions
function listTodaySessions() {
    const today = new Date();
    const todaySessions = studySessions.filter((session) => {
        return (
            session.sessionTime.getDate() === today.getDate() &&
            session.sessionTime.getMonth() === today.getMonth() &&
            session.sessionTime.getFullYear() === today.getFullYear()
        );
    });

    if (todaySessions.length === 0) {
        console.log("No study sessions scheduled for today.");
    } else {
        console.log("Today's study sessions:");
        todaySessions.forEach((session) => {
            console.log(`- ${session.topic} at ${session.sessionTime.toLocaleTimeString()} for ${session.duration} minutes.`);
        });
    }
}

// Function to log a countdown message when the session starts
function sessionCountdown(session) {
    const now = new Date();
    const timeUntilSession = session.sessionTime - now;

    if (timeUntilSession > 0) {
        setTimeout(() => {
            console.log(`Session on ${session.topic} starts now!`);
        }, timeUntilSession);
    }
}

// Function to simulate fetching study materials asynchronously
async function fetchStudyMaterials(topic) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const materials = {
                Math: ["Algebra Notes", "Calculus Problems"],
                Science: ["Physics Formulas", "Chemistry Experiments"],
                History: ["World War II Timeline", "Ancient Civilizations"],
            };

            if (materials[topic]) {
                resolve(materials[topic]);
            } else {
                reject("No materials found for the given topic.");
            }
        }, 2000); // Simulate a 2-second delay
    });
}

// Export functions
module.exports = { addSession, listTodaySessions, sessionCountdown, fetchStudyMaterials };