function addTask() {
    var title = document.getElementById("taskTitle").value;
    var description = document.getElementById("taskDescription").value;
    if (title === "" || description === "") {
        alert("Please enter both title and description!");
        return;
    }

    var task = {
        title: title,
        description: description,
        completed: false
    };

    tasks.push(task);
    renderTasks();
    clearInputs();
}

// Function to mark a task as completed
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to toggle the complete button's class and text based on the task's completion state
function toggleCompleteButton(taskDiv, completed) {
    var completeButton = taskDiv.querySelector(".complete-button");
    if (completed) {
        completeButton.classList.add("completed");
        completeButton.innerText = "Completed";
    } else {
        completeButton.classList.remove("completed");
        completeButton.innerText = "Complete";
    }
}

// Function to render the tasks on the page
function renderTasks() {
    var tasksDiv = document.getElementById("tasks");
    tasksDiv.innerHTML = ""; // Clear existing tasks before rendering

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var taskDiv = document.createElement("div");
        taskDiv.className = "task mb-2 p-3 bg-light rounded";

        var titleDiv = document.createElement("div");
        titleDiv.className = "title font-weight-bold";
        titleDiv.innerText = task.title;

        var descriptionDiv = document.createElement("div");
        descriptionDiv.className = "description";
        descriptionDiv.innerText = task.description;

        var actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";

        var completeButton = document.createElement("button");
        completeButton.className = "complete-button btn";
        completeButton.innerText = task.completed ? "Completed" : "Complete";
        completeButton.onclick = (function(index) {
            return function() {
                completeTask(index);
            };
        })(i);
        actionsDiv.appendChild(completeButton);

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-button btn";
        deleteButton.innerText = "Delete";
        deleteButton.onclick = (function(index) {
            return function() {
                deleteTask(index);
            };
        })(i);
        actionsDiv.appendChild(deleteButton);

        taskDiv.appendChild(titleDiv);
        taskDiv.appendChild(descriptionDiv);
        taskDiv.appendChild(actionsDiv);
        tasksDiv.appendChild(taskDiv);

        // Toggle complete button class and text based on the task's completion state
        toggleCompleteButton(taskDiv, task.completed);
    }
}

// Function to clear the input fields
function clearInputs() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
}

// Initialize tasks as an empty array
var tasks = [];

// Initial rendering of tasks
renderTasks();
