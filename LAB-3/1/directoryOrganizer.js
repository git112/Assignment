const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to organize files in a directory
function organizeDirectory(directoryPath) {
    try {
        // Check if the directory exists
        if (!fs.existsSync(directoryPath)) {
            throw new Error("Directory does not exist.");
        }

        // Read the contents of the directory
        const files = fs.readdirSync(directoryPath);

        // Define categories and their corresponding file extensions
        const categories = {
            Images: [".jpg", ".jpeg", ".png", ".gif"],
            Documents: [".pdf", ".docx", ".txt", ".xlsx"],
            Videos: [".mp4", ".mkv", ".avi"],
            Others: [],
        };

        // Create subfolders for each category
        for (const category in categories) {
            const categoryPath = path.join(directoryPath, category);
            if (!fs.existsSync(categoryPath)) {
                fs.mkdirSync(categoryPath);
            }
        }

        // Move files to their respective subfolders
        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            if (fs.lstatSync(filePath).isFile()) {
                const fileExtension = path.extname(file).toLowerCase();
                let category = "Others";

                // Find the category for the file
                for (const [cat, extensions] of Object.entries(categories)) {
                    if (extensions.includes(fileExtension)) {
                        category = cat;
                        break;
                    }
                }

                // Move the file
                const newFilePath = path.join(directoryPath, category, file);
                fs.renameSync(filePath, newFilePath);
                console.log(`Moved ${file} to ${category}/`);
            }
        });

        console.log("Directory organized successfully!");
    } catch (error) {
        console.error(`Error organizing directory: ${error.message}`);
    } finally {
        rl.close();
    }
}

// Prompt the user for the directory path
rl.question("Enter the directory path to organize: ", (directoryPath) => {
    organizeDirectory(directoryPath);
});