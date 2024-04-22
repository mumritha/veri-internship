document.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("btn");
    const taskList = document.getElementById("task-list");

    renderTasks();

    addTaskBtn.addEventListener("click", addTask);

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
                <div class="actions">
                    <button class="markcomplete" onclick="toggleCompleted(${index})">${task.completed ? 'Mark Incomplete' : 'Mark Complete'}</button>
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask(e) {
        e.preventDefault();
        const title = taskInput.value.trim();
        if (title) {
            tasks.push({ title, completed: false });
            renderTasks();
            taskInput.value = "";
        } else {
            alert("Please enter a task!");
        }
    }

    window.toggleCompleted = function (index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.editTask = function (index) {
        const newTitle = prompt("Edit task:", tasks[index].title);
        if (newTitle !== null) {
            tasks[index].title = newTitle.trim();
            renderTasks();
        }
    };

    window.deleteTask = function (index) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            renderTasks();
        }
    };
});