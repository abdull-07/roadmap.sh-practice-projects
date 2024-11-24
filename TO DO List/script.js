// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => loadTasks());

// Add a task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToDOM(taskText, false); // Add task with "unchecked" state
        saveTaskToLocalStorage(taskText, false);
        taskInput.value = ''; // Clear input field
    }
};

// Add task to DOM
const addTaskToDOM = (taskText, isCompleted) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('showtask');
    taskDiv.innerHTML = `
        <input type="checkbox" ${isCompleted ? 'checked disabled' : ''}>
        <p id="task-added" contenteditable="${!isCompleted}" style="${isCompleted ? 'text-decoration: line-through; color: gray;' : ''}">${taskText}</p>
        <button class="delete-task" id="delete-task">Delete</button>
        <hr>
    `;

    // Add event listener for checkbox
    taskDiv.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
        if (e.target.checked) {
            markTaskCompleted(taskText, taskDiv);
        }
    });

    // Add event listener for delete button
    taskDiv.querySelector('.delete-task').addEventListener('click', () => deleteTask(taskText, taskDiv));

    // Append to task list
    if (isCompleted) {
        taskList.appendChild(taskDiv); // Add to the bottom for completed tasks
    } else {
        taskList.prepend(taskDiv); // Add to the top for new tasks
    }
};

// Save task to localStorage
const saveTaskToLocalStorage = (taskText, isCompleted) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Load tasks from localStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

// Mark task as completed
const markTaskCompleted = (taskText, taskDiv) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update localStorage: Mark task as completed and reorder
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            return { text: task.text, completed: true };
        }
        return task;
    });
    // Move completed tasks to the end of the list
    tasks.sort((a, b) => a.completed - b.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update the DOM
    const checkbox = taskDiv.querySelector('input[type="checkbox"]');
    const taskTextElement = taskDiv.querySelector('#task-added');
    taskTextElement.style.textDecoration = 'line-through';
    taskTextElement.style.color = 'gray';
    taskTextElement.setAttribute('contenteditable', 'false'); // Disable editing
    checkbox.disabled = true;

    // Move the task to the bottom of the list
    taskList.removeChild(taskDiv);
    taskList.appendChild(taskDiv);
};

// Delete task
const deleteTask = (taskText, taskDiv) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskList.removeChild(taskDiv); // Remove task element from DOM
};

// Event listeners
addTaskBtn.addEventListener('click', () => addTask());
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});