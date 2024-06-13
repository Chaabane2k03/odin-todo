export function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.forEach(function(projectName) {
        addProject(projectName);
    });
}

export function addProjectFromInput(projectName) {
    addProject(projectName);
    saveProjects();
}

function addProject(projectName) {
    const projectsList = document.getElementById('projects-list');

    // Create a new project button
    const newProjectButton = document.createElement('button');
    newProjectButton.type = 'button';
    newProjectButton.className = 'btn btn-danger btn-lg odin-btn odin-added-btn';
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

function saveProjects() {
    const projectsList = document.getElementById('projects-list');
    const projects = [];
    projectsList.querySelectorAll('.odin-added-btn').forEach(function(projectBtn) {
        const projectName = projectBtn.querySelector('.left-project-panel span').textContent;
        projects.push(projectName);
    });
    localStorage.setItem('projects', JSON.stringify(projects));
}
