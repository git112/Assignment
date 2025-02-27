// Import the scheduler module
const { addAppointment, upcomingAppointments, sendReminder } = require("./schedular");

// Example usage
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to take user input
function promptUser() {
    readline.question(
        "Enter client name, appointment time (YYYY-MM-DD HH:MM), and service type (e.g., 'John 2023-10-25 14:30 Consultation'): ",
        (input) => {
            const [clientName, date, time, ...serviceTypeParts] = input.split(" ");
            const serviceType = serviceTypeParts.join(" ");
            const appointmentTime = new Date(`${date}T${time}:00`);

            // Add the appointment
            addAppointment(clientName, appointmentTime, serviceType);

            // Send a reminder for the appointment
            const appointment = { clientName, appointmentTime, serviceType };
            sendReminder(appointment);

            // Display upcoming appointments
            upcomingAppointments();

            // Ask if the user wants to add another appointment
            readline.question("Add another appointment? (yes/no): ", (answer) => {
                if (answer.toLowerCase() === "yes") {
                    promptUser();
                } else {
                    readline.close();
                }
            });
        }
    );
}

// Start the prompt
promptUser();