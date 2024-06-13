// tasks.js

import { format, parseISO } from 'date-fns';

let tasks = [];

export function initializeTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks = storedTasks;
    }
}

export function addTaskToProject(projectName, taskName) {
    const dueDate = null; // You can add due date logic here if required
    const newTask = {
        project: projectName,
        name: taskName,
        dueDate: dueDate
    };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
    const projectTasksContainer = document.getElementById('project-tasks');
    projectTasksContainer.innerHTML = '';
    tasks.forEach(task => {
        if (task.project === projectName) {
            const taskElement = document.createElement('button');
            taskElement.classList.add('button-task');
            taskElement.dataset.taskButton = '';
            taskElement.innerHTML = `
                <div class="left-task-panel">
                    <i class="far fa-circle"></i>
                    <p class="task-content">${task.name}</p>
                    <input type="text" class="input-task-name" data-input-task-name>
                </div>
                <div class="right-task-panel">
                    <p class="due-date">${task.dueDate ? format(parseISO(task.dueDate), 'MMMM dd, yyyy') : ''}</p>
                    <input type="date" class="input-due-date" data-input-due-date>
                    <i class="fas fa-times"></i>
                </div>`;
            projectTasksContainer.appendChild(taskElement);
        }
    });
}

export function loadTasksByProjectName(projectName) {
    const projectTasks = tasks.filter(task => task.project === projectName);
    displayTasks(projectTasks);
}
