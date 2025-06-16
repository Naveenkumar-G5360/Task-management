const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks'));

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskCard(task) {
    return `
        <div class="task-card">
            <h3>${task.name}</h3>
            <div> Assigned To: ${task.assignee}</div>
            <div> Status: ${task.status}</div>
            <div> Description: ${task.description}</div>
            <div> id: ${task.id}</div>
            <button onclick="deleteTask('${task.id}')" style="background-color: red;">Delete</button>
        </div>
    `;
}

function showTasks() {
    taskList.innerHTML = tasks.map(task => createTaskCard(task)).join('');
}

taskForm.onsubmit = function(e) {
    e.preventDefault();
    
    const newTask = {
        id: Date.now().toString(),
        name: document.getElementById('taskName').value,
        assignee: document.getElementById('assignee').value,
        status: document.getElementById('status').value,
        description: document.getElementById('description').value
    };
    
    tasks.push(newTask);
    saveTasks();
    showTasks();
    taskForm.reset();
};

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    showTasks();
}

showTasks();
