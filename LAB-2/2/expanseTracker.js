// Array to store expenses
let expenses = [];

// Function to add a new expense
function addExpense(description, amount, date) {
    try {
        // Validate description
        if (!description || typeof description !== "string") {
            throw new Error("Invalid description. Please provide a non-empty string.");
        }

        // Validate amount (must be a positive number)
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("Invalid amount. Please provide a positive number.");
        }

        // Validate date (must be a valid Date object)
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Invalid date. Please provide a valid Date object.");
        }

        // Add the expense to the array
        expenses.push({ description, amount, date });
        console.log(`Expense added: ${description} - $${amount} on ${date.toDateString()}.`);
    } catch (error) {
        console.error(`Error adding expense: ${error.message}`);
    }
}

// Function to calculate total expenses
function totalExpenses() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`Total expenses: $${total.toFixed(2)}`);
    return total;
}

// Function to filter expenses by date range
function filterByDateRange(startDate, endDate) {
    const filteredExpenses = expenses.filter((expense) => {
        return expense.date >= startDate && expense.date <= endDate;
    });

    if (filteredExpenses.length === 0) {
        console.log("No expenses found in the specified date range.");
    } else {
        console.log(`Expenses between ${startDate.toDateString()} and ${endDate.toDateString()}:`);
        filteredExpenses.forEach((expense) => {
            console.log(`- ${expense.description}: $${expense.amount} on ${expense.date.toDateString()}`);
        });
    }
    return filteredExpenses;
}

// Function to simulate fetching an expense report asynchronously
function fetchExpenseReport() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (expenses.length > 0) {
                const report = expenses.map((expense) => ({
                    description: expense.description,
                    amount: expense.amount,
                    date: expense.date.toDateString(),
                }));
                resolve(report);
            } else {
                reject("No expenses found to generate a report.");
            }
        }, 2000); // Simulate a 2-second delay
    });
}

// Export functions
module.exports = { addExpense, totalExpenses, filterByDateRange, fetchExpenseReport };