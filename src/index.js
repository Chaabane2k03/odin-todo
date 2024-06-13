import { loadProjects, addProjectFromInput } from './projects.js';

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('button-add-project');
    const popup = document.getElementById('add-project-popup');
    const cancelButton = document.getElementById('button-cancel-project-popup');
    const addProjectButton = document.getElementById('button-add-project-popup');
    const inputProject = document.getElementById('input-add-project-popup');
    const projectNameElement = document.getElementById('project-name');

    // Load projects and tasks
    loadProjects();
    //TODO : when initializing we should load inbox and its tasks :)
    
    // Show the popup to add a new project
    addButton.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    // Hide the popup when the cancel button is clicked
    cancelButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Add a new project
    addProjectButton.addEventListener('click', function() {
        const projectName = inputProject.value.trim();
        if (projectName !== '') {
            addProjectFromInput(projectName);
            inputProject.value = '';
            popup.style.display = 'none';
            addProjectButtonListener(projectName);
        } else {
            alert('Please enter a project name.');
        }
    });

    

    // Function to add event listener to project buttons
    function addProjectButtonListener(projectName) {
        const projectButtons = document.querySelectorAll('.button-default-project');
        projectButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the project name from the data attribute
                projectName = this.getAttribute('data-project-name');
                // Update the project name in the right panel
                projectNameElement.textContent = projectName;

                //TODO : loading tasks from JSON : switch case between inbox , today and other ones
            });

        });

        
    }

    // Initial call to add event listeners to already existing project buttons
    addProjectButtonListener();
});
