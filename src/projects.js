//Loading projects from JSON to Html
export function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.forEach(function(projectName) {
        addProject(projectName);
    });
}


//adding project after writing the project name
export function addProjectFromInput(projectName) {
    addProject(projectName);
    saveProjects();
}

//The addproject method : it adds the projects in HTML
function addProject(projectName) {
    const projectsList = document.getElementById('projects-list');

    // Create a new project button
    const newProjectButton = document.createElement('button');
    newProjectButton.type = 'button';
    newProjectButton.className = `btn btn-danger btn-lg odin-btn odin-added-btn button-default-project`;
    newProjectButton.setAttribute('data-project-name',projectName)
    newProjectButton.innerHTML = `
        <div class="left-project-panel">
            <i class="fas fa-check"></i>
            <span>${projectName}</span>
        </div>
        <div class="right-project-panel">
            <i class="fas fa-times delete-project"></i>
        </div>
    `;

    // Add event listener to the delete button
    newProjectButton.querySelector('.delete-project').addEventListener('click', function() {
        newProjectButton.remove();
        saveProjects();
    });

    // Append the new project button to the projects list
    projectsList.appendChild(newProjectButton);
}

//Saving the project in the JSON : 
function saveProjects() {
    const projectsList = document.getElementById('projects-list');
    const projects = [];
    projectsList.querySelectorAll('.odin-added-btn').forEach(function(projectBtn) {
        const projectName = projectBtn.querySelector('.left-project-panel span').textContent;
        projects.push(projectName);
    });
    localStorage.setItem('projects', JSON.stringify(projects));
}
