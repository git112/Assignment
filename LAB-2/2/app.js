// Import the expense tracker module
const { addExpense, totalExpenses, filterByDateRange, fetchExpenseReport } = require("./expanseTracker");

// Example usage
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to take user input for adding an expense
function promptAddExpense() {
    readline.question(
        "Enter expense description, amount, and date (YYYY-MM-DD) (e.g., 'Groceries 50 2023-10-25'): ",
        (input) => {
            const [description, amountStr, dateStr] = input.split(" ");
            const amount = parseFloat(amountStr);
            const date = new Date(dateStr);

            // Add the expense
            addExpense(description, amount, date);

            // Ask if the user wants to add another expense
            readline.question("Add another expense? (yes/no): ", (answer) => {
                if (answer.toLowerCase() === "yes") {
                    promptAddExpense();
                } else {
                    // Display total expenses
                    totalExpenses();

                    // Prompt for date range filtering
                    promptFilterByDateRange();
                }
            });
        }
    );
}

// Function to take user input for filtering expenses by date range
function promptFilterByDateRange() {
    readline.question(
        "Enter start date and end date (YYYY-MM-DD YYYY-MM-DD) to filter expenses (e.g., '2023-10-01 2023-10-31'): ",
        (input) => {
            const [startDateStr, endDateStr] = input.split(" ");
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);

            // Filter expenses by date range
            filterByDateRange(startDate, endDate);

            // Fetch and display the expense report asynchronously
            fetchExpenseReport()
                .then((report) => {
                    console.log("Expense Report:");
                    console.log(JSON.stringify(report, null, 2));
                })
                .catch((error) => {
                    console.error(`Error fetching expense report: ${error}`);
                })
                .finally(() => {
                    readline.close();
                });
        }
    );
}

// Start the prompt
promptAddExpense();