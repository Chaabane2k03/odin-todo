
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
        <button type="button" class="btn btn-danger btn-lg odin-btn odin-added-btn">       
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

        `
    }    
    //Clearing the content
    //Handling popups and Inputs :
    //Project event listeners :
    //Task event Listeners : 
    //Project Buttons :
    //Task Buttons :

}
