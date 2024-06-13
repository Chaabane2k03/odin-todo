import { format } from 'date-fns';
import Storage from './storage';
import Project from './project';
import Task from './task';

export default class UI {
  // Loading Content
  static loadHomePage() {
    UI.loadProjects();
    UI.initProjectButtons();
    UI.openProject('Inbox', document.getElementById("button-inbox-projects"));
    document.addEventListener('keydown', UI.handleKeyboardInput);
  }

  static loadProjects() {
    Storage.getTodoList()
      .getProjects()
      .forEach(project => {
        if (project.name !== 'Inbox' && project.name !== 'Today' && project.name !== 'This week') {
          UI.createProject(project.name);
        }
      });
  }

  static loadTasks(projectName) {
    Storage.getTodoList()
      .getProject(projectName)
      .getTasks()
      .forEach(task => UI.createTask(task.name, task.dueDate));
  }

  static loadProjectContent(projectName) {
    const projectPreview = document.getElementById('project-preview');
    projectPreview.innerHTML = `
      <h1 id="project-name" class="project-name">
        <span>${projectName}</span>
      </h1>
      <div class="tasks-list" id="tasks-list"></div>
    `;

    if (projectName !== 'Today' && projectName !== 'This week') {
      projectPreview.innerHTML += `
        <div class="add-task-popup">
          <button class="button-add-task btn btn-outline-secondary" id="button-add-task">
            <i class="fas fa-plus"></i> Add Task
          </button>
        </div>
        <div class="input-group add-task-input-popup">
          <input type="text" class="form-control" placeholder="Hang out with friends">
          <button class="btn btn-outline-success">Add</button>
          <button class="btn btn-outline-danger">Cancel</button>
        </div>
      `;
    }

    UI.loadTasks(projectName);
  }

  // Creating Content
  static createProject(name) {
    const userProjects = document.getElementById('projects-list');
    userProjects.innerHTML += `
      <button type="button" class="btn btn-danger btn-lg odin-btn odin-added-btn button-project">
        <div class="left-project-panel">
          <i class="fas fa-check"></i>
          <span>${name}</span>
        </div>
        <div class="right-project-panel">
          <i class="fas fa-times"></i>
        </div>
      </button>
    `;
    UI.initProjectButtons();
  }

  static createTask(name, dueDate) {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML += `
      <button class="button-task" data-task-button>
        <div class="left-task-panel">
          <i class="far fa-circle"></i>
          <p class="task-content">${name}</p>
          <input type="text" class="input-task-name" data-input-task-name>
        </div>
        <div class="right-task-panel">
          <p class="due-date">${dueDate}</p>
          <input type="date" class="input-due-date" data-input-due-date>
          <i class="fas fa-times"></i>
        </div>
      </button>
    `;
    UI.initTaskButtons();
  }

  // Clearing Content
  static clear() {
    UI.clearProjectPreview();
    UI.clearProjects();
    UI.clearTasks();
  }

  static clearProjectPreview() {
    const projectPreview = document.getElementById('project-preview');
    projectPreview.textContent = '';
  }

  static clearProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.textContent = '';
  }

  static clearTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.textContent = '';
  }

  // Handling Popups and Inputs
  static closeAllPopups() {
    UI.closeAddProjectPopup();
    if (document.getElementById('button-add-task')) {
      UI.closeAddTaskPopup();
    }
    if (document.getElementById('tasks-list') && document.getElementById('tasks-list').innerHTML !== '') {
      UI.closeAllInputs();
    }
  }

  static closeAllInputs() {
    document.querySelectorAll('[data-task-button]').forEach(button => {
      UI.closeRenameInput(button);
      UI.closeSetDateInput(button);
    });
  }

  static handleKeyboardInput(e) {
    if (e.key === 'Escape') UI.closeAllPopups();
  }

  // Project Event Listeners
  static initAddProjectButtons() {
    const addProjectButton = document.getElementById('button-add-project');
    const addProjectPopupButton = document.getElementById('button-add-project-popup');
    const cancelProjectPopupButton = document.getElementById('button-cancel-project-popup');
    const addProjectPopupInput = document.getElementById('input-add-project-popup');

    addProjectButton.addEventListener('click', UI.openAddProjectPopup);
    addProjectPopupButton.addEventListener('click', UI.addProject);
    cancelProjectPopupButton.addEventListener('click', UI.closeAddProjectPopup);
    addProjectPopupInput.addEventListener('keypress', UI.handleAddProjectPopupInput);
  }

  static openAddProjectPopup() {
    UI.closeAllPopups();
    document.getElementById('add-project-popup').classList.add('active');
    document.getElementById('button-add-project').classList.add('active');
  }

  static closeAddProjectPopup() {
    document.getElementById('add-project-popup').classList.remove('active');
    document.getElementById('button-add-project').classList.remove('active');
    document.getElementById('input-add-project-popup').value = '';
  }

  static addProject() {
    const projectName = document.getElementById('input-add-project-popup').value;

    if (projectName === '') {
      alert("Project name can't be empty");
      return;
    }

    if (Storage.getTodoList().contains(projectName)) {
      document.getElementById('input-add-project-popup').value = '';
      alert('Project names must be different');
      return;
    }

    Storage.addProject(new Project(projectName));
    UI.createProject(projectName);
    UI.closeAddProjectPopup();
  }

  static handleAddProjectPopupInput(e) {
    if (e.key === 'Enter') UI.addProject();
  }

  static initProjectButtons() {
    document.getElementById('button-inbox-projects').addEventListener('click', UI.openInboxTasks);
    document.getElementById('button-today-projects').addEventListener('click', UI.openTodayTasks);
    document.getElementById('button-week-projects').addEventListener('click', UI.openWeekTasks);
    document.querySelectorAll('[data-project-button]').forEach(projectButton =>
      projectButton.addEventListener('click', UI.handleProjectButton)
    );
  }

  static openInboxTasks() {
    UI.openProject('Inbox', this);
  }

  static openTodayTasks() {
    Storage.updateTodayProject();
    UI.openProject('Today', this);
  }

  static openWeekTasks() {
    Storage.updateWeekProject();
    UI.openProject('This week', this);
  }

  static handleProjectButton(e) {
    const projectName = this.querySelector('.left-project-panel span').textContent;

    if (e.target.classList.contains('fa-times')) {
      UI.deleteProject(projectName, this);
      return;
    }

    UI.openProject(projectName, this);
  }

  static openProject(projectName, projectButton) {
    document.querySelectorAll('.button-default-project, .button-project').forEach(button =>
      button.classList.remove('active')
    );
    projectButton.classList.add('active');
    UI.closeAddProjectPopup();
    UI.loadProjectContent(projectName);
  }

  static deleteProject(projectName, button) {
    if (button.classList.contains('active')) UI.clearProjectPreview();
    Storage.deleteProject(projectName);
    UI.clearProjects();
    UI.loadProjects();
  }

  static initAddTaskButtons() {
    const addTaskButton = document.getElementById('button-add-task');
    const addTaskPopupButton = document.getElementById('button-add-task-popup');
    const cancelTaskPopupButton = document.getElementById('button-cancel-task-popup');
    const addTaskPopupInput = document.getElementById('input-add-task-popup');

    addTaskButton.addEventListener('click', UI.openAddTaskPopup);
    addTaskPopupButton.addEventListener('click', UI.addTask);
    cancelTaskPopupButton.addEventListener('click', UI.closeAddTaskPopup);
    addTaskPopupInput.addEventListener('keypress', UI.handleAddTaskPopupInput);
  }

  static handleAddTaskPopupInput(e) {
    if (e.key === 'Enter') UI.addTask();
  }

  static openAddTaskPopup() {
    UI.closeAllPopups();
    document.querySelector('.add-task-popup').classList.add('active');
    document.querySelector('.add-task-input-popup').classList.add('active');
  }

  static closeAddTaskPopup() {
    document.querySelector('.add-task-popup').classList.remove('active');
    document.querySelector('.add-task-input-popup').classList.remove('active');
    document.querySelector('.add-task-input-popup input').value = '';
  }

  static addTask() {
    const taskName = document.querySelector('.add-task-input-popup input').value;

    if (taskName === '') {
      alert("Task name can't be empty");
      return;
    }

    const projectName = document.getElementById('project-name').firstElementChild.textContent;
    const task = new Task(taskName, format(new Date(), 'yyyy-MM-dd'));

    Storage.addTask(projectName, task);
    UI.createTask(taskName, task.dueDate);
    UI.closeAddTaskPopup();
  }

  // Task Event Listeners
  static initTaskButtons() {
    document.querySelectorAll('[data-task-button]').forEach(taskButton =>
      taskButton.addEventListener('click', UI.handleTaskButton)
    );
  }

  static handleTaskButton(e) {
    const taskButton = e.currentTarget;

    if (e.target.classList.contains('fa-circle')) {
      UI.completeTask(taskButton);
      return;
    }

    if (e.target.classList.contains('task-content')) {
      UI.openRenameInput(taskButton);
      return;
    }

    if (e.target.classList.contains('due-date')) {
      UI.openSetDateInput(taskButton);
      return;
    }

    if (e.target.classList.contains('fa-times')) {
      UI.deleteTask(taskButton);
      return;
    }
  }

  static completeTask(taskButton) {
    const taskName = taskButton.querySelector('.task-content').textContent;
    const projectName = document.getElementById('project-name').firstElementChild.textContent;

    Storage.deleteTask(projectName, taskName);
    taskButton.remove();
  }

  static openRenameInput(taskButton) {
    UI.closeAllInputs();
    taskButton.querySelector('.task-content').classList.add('active');
    taskButton.querySelector('.input-task-name').classList.add('active');
    taskButton.querySelector('.input-task-name').value = taskButton.querySelector('.task-content').textContent;
  }

  static closeRenameInput(taskButton) {
    taskButton.querySelector('.task-content').classList.remove('active');
    taskButton.querySelector('.input-task-name').classList.remove('active');
    taskButton.querySelector('.input-task-name').value = '';
  }

  static openSetDateInput(taskButton) {
    UI.closeAllInputs();
    taskButton.querySelector('.due-date').classList.add('active');
    taskButton.querySelector('.input-due-date').classList.add('active');
    taskButton.querySelector('.input-due-date').value = format(new Date(), 'yyyy-MM-dd');
  }

  static closeSetDateInput(taskButton) {
    taskButton.querySelector('.due-date').classList.remove('active');
    taskButton.querySelector('.input-due-date').classList.remove('active');
    taskButton.querySelector('.input-due-date').value = '';
  }

  static deleteTask(taskButton) {
    const taskName = taskButton.querySelector('.task-content').textContent;
    const projectName = document.getElementById('project-name').firstElementChild.textContent;

    Storage.deleteTask(projectName, taskName);
    taskButton.remove();
  }
}
