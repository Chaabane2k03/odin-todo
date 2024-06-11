
import {format} from 'date-fns';
import Storage from './storage';
import Project from './project';
import Task from './task';


export default class UI{
    //loading content :
    /*
        load Home page
        load tasks by project
        load projects
        load projects content 
    */
    static loadHomePage(){
        UI.loadProjects() // TODO
        UI.initProjectButtons() //TODO
        UI.openProject('Inbox' , document.getElementById("button-index-projects")) //TODO
        document.addEventListener('keydown' , UI.handleKeyboardInput); //TODO
    }

    static loadProjects(){
        Storage.getTodoList()
        .getProjects()
        .forEach((project) => {
            if(
                project.name !== 'Inbox' &&
                project.name !== 'Today' &&
                project.name !== 'This week'
            ){
                UI.createProject(project.name)
            }
        });
    }

    static loadTasks(projectName){
        Storage.getTodoList()
        .getProject(projectName)
        .getTasks()
        .forEach((task) =>
            UI.createTask(task.name, task.dueDate)
        ) 
    }

    static loadProjectContent(projectName){
        const projectPreview = document.getElementById('project-preview')
        projectPreview.innerHTML = `
            <h1 id="project-name" class="project-name">
                <span> ${projectName} </span>
            </h1>
            <div class="tasks-list" id="tasks-list"></div> 
        `
        if(projectName !== 'Today' && projectName !== 'This week'){
            projectPreview.innerHTML += `
            <div class="add-task-popup">
                <button class="button-add-task btn btn-outline-secondary" id="button-add-task">
                    <i class="fas fa-plus"></i>
                    Add Task
                </button>
            </div>
            <div class="input-group add-task-input-popup">
                <input type="text" class="form-control" placeholder="Hang out with friends" aria-label="Recipient's username with two button addons">
                <button class="btn btn-outline-success" type="button">Add</button>
                <button class="btn btn-outline-danger" type="button">Cancel</button>
            </div>
            `;


            
        }
        UI.loadTasks(projectName);
    }



    //CREATING CONTENT :

    //create the project :
    static createProject(name){
        const userProjects = document.getElementById('projects-list')
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
        `
        UI.initProjectButtons()
    }

    static createTask(name , dueDate){
        const tasksList = document.getElementById('tasks-list')
        //TODO : still the design of a task and the rest of the function 
        tasksList.innerHTML += `
            <button class="button-task" data-task-button>
                <div class="left-task-panel">
                    <i class="far fa-circle"></i>
                    <p class="task-content">${name}</p>
                    <input type="text" class="input-task-name" data-input-task-name>
                </div>
                <div class="right-task-panel">
                    <p class="due-date" id="due-date">${dueDate}</p>
                    <input type="date" class="input-due-date" data-input-due-date>
                    <i class="fas fa-times"></i>
                </div>
            </button>
        `
        UI.initTaskButtons()
    }    
    //Clearing the content
    static clear(){
        UI.clearProjectPreview()
        UI.clearProjects()
        UI.clearTasks()
    }

    static clearProjectPreview(){
        const projectPreview = document.getElementById('project-preview')
        projectPreview.textContent = ''
    }

    static clearProjects() {
        const projectsList = document.getElementById('projects-list')
        projectsList.textContent = ''
    }
    
    static clearTasks() {
        const tasksList = document.getElementById('tasks-list')
        tasksList.textContent = ''
    }
    //Handling popups and Inputs :

    static closeAllPopups(){
        UI.closeAddProjectPopup()
        if(document.getElementById('button-add-task')){
            UI.closeAddTakPopUp()
            
        }
        if (
            document.getElementById('tasks-list') &&
            document.getElementById('tasks-list').innerHTML !== ''
        ){
            UI.closeAllInputs()
        }
    }

    //149 :)
    static closeAllInputs() {
        const taskButtons = document.querySelectorAll('[data-task-button]')
    
        taskButtons.forEach((button) => {
          UI.closeRenameInput(button)
          UI.closeSetDateInput(button)
        })
    }

    static handleKeyboardInput(e) {
        if (e.key === 'Escape') UI.closeAllPopups()
    }

    //Project event listeners :
    static initAddProjectButtons() {
        const addProjectButton = document.getElementById('button-add-project')
        const addProjectPopupButton = document.getElementById(
          'button-add-project-popup'
        )
        const cancelProjectPopupButton = document.getElementById(
          'button-cancel-project-popup'
        )
        const addProjectPopupInput = document.getElementById(
          'input-add-project-popup'
        )
    
        addProjectButton.addEventListener('click', UI.openAddProjectPopup)
        addProjectPopupButton.addEventListener('click', UI.addProject)
        cancelProjectPopupButton.addEventListener('click', UI.closeAddProjectPopup)
        addProjectPopupInput.addEventListener(
          'keypress',
          UI.handleAddProjectPopupInput
        )
    }

    static openAddProjectPopup() {
        const addProjectPopup = document.getElementById('add-project-popup')
        const addProjectButton = document.getElementById('button-add-project')
    
        UI.closeAllPopups()
        addProjectPopup.classList.add('active')
        addProjectButton.classList.add('active')
      }


      static closeAddProjectPopup() {
        const addProjectPopup = document.getElementById('add-project-popup')
        const addProjectButton = document.getElementById('button-add-project')
        const addProjectPopupInput = document.getElementById(
          'input-add-project-popup'
        )
    
        addProjectPopup.classList.remove('active')
        addProjectButton.classList.remove('active')
        addProjectPopupInput.value = ''
    }

    static addProject() {
        const addProjectPopupInput = document.getElementById(
        'input-add-project-popup'
        )
        const projectName = addProjectPopupInput.value
        
        if (projectName === '') {
        alert("Project name can't be empty")
        return
        }
        
        if (Storage.getTodoList().contains(projectName)) {
            addProjectPopupInput.value = ''
            alert('Project names must be different')
            return
        }
        
            Storage.addProject(new Project(projectName))
            UI.createProject(projectName)
            UI.closeAddProjectPopup()
    }

    static handleAddProjectPopupInput(e) {
        if (e.key === 'Enter') UI.addProject()
    }

    //Task event Listeners : 
    static initProjectButtons(){
        const inboxProjectsButton = document.getElementById('button-inbox-projects')
        const todayProjectsButton = document.getElementById('button-today-projects')
        const weekProjectsButton = document.getElementById('button-week-projects')
        const projectButtons = document.querySelectorAll('[data-project-button]')

        inboxProjectsButton.addEventListener('click', UI.openInboxTasks)
        todayProjectsButton.addEventListener('click', UI.openTodayTasks)
        weekProjectsButton.addEventListener('click', UI.openWeekTasks)
        projectButtons.forEach((projectButton) =>
            projectButton.addEventListener('click', UI.handleProjectButton)
        )
    }

    static openInboxTasks() {
        UI.openProject('Inbox', this)
      
    }

    static openTodayTasks() {
        Storage.updateTodayProject()
        UI.openProject('Today', this)
    }

    static openWeekTasks() {
        Storage.updateWeekProject()
        UI.openProject('This week', this)
    }

    static handleProjectButton(e) {
        const projectName = this.children[0].children[1].textContent
    
        if (e.target.classList.contains('fa-times')) {
          UI.deleteProject(projectName, this)
          return
        }
    
        UI.openProject(projectName, this)
    }
    
    //275
    static openProject(projectName,projectButton){
        const defaultProjectButtons = document.querySelectorAll('.button-default-project')
        const projectButtons = document.querySelectorAll('.button-project')
        const buttons = [...defaultProjectButtons , ...projectButtons]

        buttons.forEach((button) => button.classList.remove('active'))
        projectButton.classList.add('active')
        UI.closeAddProjectPopup()
        UI.loadProjectContent(projectName)

    }

    static deleteProject(projectName, button){
        if(button.classList.contains('active')) UI.clearProjectPreview()
        Storage.deleteProject(projectName)
        UI.clearProjects()
        UI.loadProjects()
    }

    static initAddTaskButtons() {
        const addTaskButton = document.getElementById('button-add-task')
        const addTaskPopupButton = document.getElementById('button-add-task-popup')
        const cancelTaskPopupButton = document.getElementById(
          'button-cancel-task-popup'
        )
        const addTaskPopupInput = document.getElementById('input-add-task-popup')
    
        addTaskButton.addEventListener('click', UI.openAddTaskPopup)
        addTaskPopupButton.addEventListener('click', UI.addTask)
        cancelTaskPopupButton.addEventListener('click', UI.closeAddTaskPopup)
        addTaskPopupInput.addEventListener('keypress', UI.handleAddTaskPopupInput)
      }

      static handleAddTaskPopupInput(e) {
        if (e.key === 'Enter') UI.addTask()
      }
    
      static openAddTaskPopup() {
        const addTaskPopup = document.getElementById('add-task-popup')
        const addTaskButton = document.getElementById('button-add-task')
    
        UI.closeAllPopups()
        addTaskPopup.classList.add('active')
        addTaskButton.classList.add('active')
      }

      static closeAddTaskPopup() {
        const addTaskPopup = document.getElementById('add-task-popup')
        const addTaskButton = document.getElementById('button-add-task')
        const addTaskInput = document.getElementById('input-add-task-popup')
    
        addTaskPopup.classList.remove('active')
        addTaskButton.classList.remove('active')
        addTaskInput.value = ''
      }

    static addTask() {
        const projectName = document.getElementById('project-name').textContent
        const addTaskPopupInput = document.getElementById('input-add-task-popup')
        const taskName = addTaskPopupInput.value
    
        if (taskName === '') {
          alert("Task name can't be empty")
          return
        }
        if (Storage.getTodoList().getProject(projectName).contains(taskName)) {
          alert('Task names must be different')
          addTaskPopupInput.value = ''
          return
        }
    
        Storage.addTask(projectName, new Task(taskName))
        UI.createTask(taskName, 'No date')
        UI.closeAddTaskPopup()
    }
    //Project Buttons :
    
    //Task Buttons :

}
