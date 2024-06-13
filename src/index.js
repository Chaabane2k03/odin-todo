import { loadProjects, addProjectFromInput } from './projects.js';

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('button-add-project');
    const popup = document.getElementById('add-project-popup');
    const cancelButton = document.getElementById('button-cancel-project-popup');
    const addProjectButton = document.getElementById('button-add-project-popup');
    const inputProject = document.getElementById('input-add-project-popup');

    // Load projects and tasks
    loadProjects();

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
        } else {
            alert('Please enter a project name.');
        }
    });
});
