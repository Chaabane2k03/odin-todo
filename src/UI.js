
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
        projectPreview.innerHTML = '<h1 id="project-name" class="project-name">${projectName}</h1> '
        projectPreview.innerHTML += '<div class="tasks-list" id="tasks-list"></div>'

        if(projectName !== 'Today' && projectName !== 'This week'){
            projectPreview.innerHTML += '<div class="add-task-popup"><button class="button-add-task btn btn-outline-secondary" id="button-add-task"><i class="fas fa-plus"></i>Add Task</button></div>'
            
        }
    }

    //Creating content :
    //Clearing the content
    //Handling popups and Inputs :
    //Project event listeners :
    //Task event Listeners : 
    //Project Buttons :
    //Task Buttons :

}
