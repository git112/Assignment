// Array to store appointments
let appointments = [];

// Function to add a new appointment
function addAppointment(clientName, appointmentTime, serviceType) {
    try {
        // Validate clientName
        if (!clientName || typeof clientName !== "string") {
            throw new Error("Invalid client name. Please provide a non-empty string.");
        }

        // Validate appointmentTime as a valid Date object
        if (!(appointmentTime instanceof Date) || isNaN(appointmentTime.getTime())) {
            throw new Error("Invalid appointment time. Please provide a valid Date object.");
        }

        // Add the appointment to the array
        appointments.push({ clientName, appointmentTime, serviceType });
        console.log(`Appointment added for ${clientName} at ${appointmentTime}.`);
    } catch (error) {
        console.error(`Error adding appointment: ${error.message}`);
    }
}

// Function to display upcoming appointments in the next hour
function upcomingAppointments() {
    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000); // Current time + 1 hour

    const upcoming = appointments.filter((appt) => {
        return appt.appointmentTime > now && appt.appointmentTime <= nextHour;
    });

    if (upcoming.length === 0) {
        console.log("No upcoming appointments in the next hour.");
    } else {
        console.log("Upcoming appointments in the next hour:");
        upcoming.forEach((appt) => {
            console.log(`- ${appt.clientName} at ${appt.appointmentTime} for ${appt.serviceType}`);
        });
    }
}

// Function to send a reminder for an appointment
function sendReminder(appointment) {
    const now = new Date();
    const timeUntilAppointment = appointment.appointmentTime - now;

    if (timeUntilAppointment > 0) {
        setTimeout(() => {
            console.log(`Reminder: Your appointment for ${appointment.serviceType} with ${appointment.clientName} is scheduled at ${appointment.appointmentTime}.`);
        }, timeUntilAppointment);
    }
}

// Export functions
module.exports = { addAppointment, upcomingAppointments, sendReminder };