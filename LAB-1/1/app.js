// Task management system

// Example tasks array
const tasks = [
    { id: 1, title: "Complete project proposal", status: "pending", priority: 4 },
    { id: 2, title: "Send invoice", status: "completed", priority: 3 },
    { id: 3, title: "Client meeting", status: "pending", priority: 5 },
    { id: 4, title: "Update documentation", status: "in-progress", priority: 2 }
  ];
  
  // Add Task: Arrow function to add a new task
  const addTask = (taskArray, title, status, priority) => {
    const newId = taskArray.length > 0 ? Math.max(...taskArray.map(task => task.id)) + 1 : 1;
    
    const newTask = {
      id: newId,
      title,
      status,
      priority
    };
    
    return [...taskArray, newTask];
  };
  
  // Delete Task: Arrow function to delete a task by id
  const deleteTask = (taskArray, taskId) => {
    return taskArray.filter(task => task.id !== taskId);
  };
  
  // Filter by Status: Function to filter tasks by status
  const filterByStatus = (taskArray, status) => {
    return taskArray.filter(task => task.status === status);
  };
  
  // Find High Priority Task: Function to find the first priority 5 task
  const findHighPriorityTask = taskArray => {
    return taskArray.find(task => task.priority === 5);
  };
  
  // Create formatted list of task titles with status
  const getFormattedTaskList = taskArray => {
    return taskArray.map(task => `Task: ${task.title}, Status: ${task.status}`);
  };
  
  // Log task details in a readable format
  const logTaskDetails = taskArray => {
    taskArray.forEach(task => {
      console.log(`
        ID: ${task.id}
        Title: ${task.title}
        Status: ${task.status}
        Priority: ${task.priority}
        -------------------
      `);
    });
  };
  
  // Example usage
  console.log("All tasks:");
  logTaskDetails(tasks);
  
  console.log("Adding a new task:");
  const updatedTasks = addTask(tasks, "Review code", "pending", 4);
  logTaskDetails(updatedTasks);
  
  console.log("Deleting a task (ID: 2):");
  const tasksAfterDeletion = deleteTask(updatedTasks, 2);
  logTaskDetails(tasksAfterDeletion);
  
  console.log("Pending tasks:");
  const pendingTasks = filterByStatus(tasks, "pending");
  logTaskDetails(pendingTasks);
  
  console.log("High priority task:");
  const highPriorityTask = findHighPriorityTask(tasks);
  console.log(highPriorityTask);
  
  console.log("Formatted task list:");
  const formattedList = getFormattedTaskList(tasks);
  formattedList.forEach(item => console.log(item));