const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to inspect and save environment details
function inspectEnvironment() {
    try {
        // Gather environment details
        const envDetails = {
            homeDirectory: os.homedir(),
            hostname: os.hostname(),
            networkInterfaces: os.networkInterfaces(),
            environmentVariables: process.env,
        };

        // Define the log directory and file path
        const logDirectory = path.join(__dirname, "logs");
        const logFilePath = path.join(logDirectory, "env-details.json");

        // Create the logs directory if it doesn't exist
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true });
        }

        // Save the environment details to a JSON file
        fs.writeFileSync(logFilePath, JSON.stringify(envDetails, null, 2));
        console.log(`Environment details saved to ${logFilePath}`);
    } catch (error) {
        console.error(`Error inspecting environment: ${error.message}`);
    } finally {
        rl.close();
    }
}

// Start the inspection
rl.question("Press Enter to inspect and save environment details...", () => {
    inspectEnvironment();
});