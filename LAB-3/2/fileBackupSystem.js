const fs = require("fs");
const path = require("path");
const readline = require("readline");
const archiver = require("archiver"); // Optional: For compressing the backup

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to back up files
function backupFiles(sourcePath, backupPath) {
    try {
        // Check if the source directory exists
        if (!fs.existsSync(sourcePath)) {
            throw new Error("Source directory does not exist.");
        }

        // Create the backup directory if it doesn't exist
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath, { recursive: true });
        }

        // Read the contents of the source directory
        const files = fs.readdirSync(sourcePath);

        // Log file for backup details
        const logFilePath = path.join(backupPath, "backup-log.txt");
        const logStream = fs.createWriteStream(logFilePath);

        // Copy files to the backup directory
        files.forEach((file) => {
            const sourceFilePath = path.join(sourcePath, file);
            const backupFilePath = path.join(backupPath, file);

            if (fs.lstatSync(sourceFilePath).isFile()) {
                fs.copyFileSync(sourceFilePath, backupFilePath);
                const stats = fs.statSync(sourceFilePath);
                logStream.write(`Copied: ${file}, Size: ${stats.size} bytes, Timestamp: ${stats.mtime}\n`);
                console.log(`Copied ${file} to backup folder.`);
            }
        });

        logStream.end();
        console.log(`Backup completed. Log saved to ${logFilePath}`);

        // Optional: Compress the backup folder
        rl.question("Do you want to compress the backup folder? (yes/no): ", (answer) => {
            if (answer.toLowerCase() === "yes") {
                const zipFilePath = path.join(backupPath, "backup.zip");
                const output = fs.createWriteStream(zipFilePath);
                const archive = archiver("zip");

                output.on("close", () => {
                    console.log(`Backup compressed to ${zipFilePath}`);
                    rl.close();
                });

                archive.pipe(output);
                archive.directory(backupPath, false);
                archive.finalize();
            } else {
                rl.close();
            }
        });
    } catch (error) {
        console.error(`Error during backup: ${error.message}`);
        rl.close();
    }
}

// Prompt the user for the source and backup paths
rl.question("Enter the source directory path: ", (sourcePath) => {
    rl.question("Enter the backup directory path: ", (backupPath) => {
        backupFiles(sourcePath, backupPath);
    });
});