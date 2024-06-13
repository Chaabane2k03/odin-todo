/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ \"./src/projects.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', function() {\r\n    const addButton = document.getElementById('button-add-project');\r\n    const popup = document.getElementById('add-project-popup');\r\n    const cancelButton = document.getElementById('button-cancel-project-popup');\r\n    const addProjectButton = document.getElementById('button-add-project-popup');\r\n    const inputProject = document.getElementById('input-add-project-popup');\r\n\r\n    // Load projects and tasks\r\n    (0,_projects_js__WEBPACK_IMPORTED_MODULE_0__.loadProjects)();\r\n\r\n    // Show the popup to add a new project\r\n    addButton.addEventListener('click', function() {\r\n        popup.style.display = 'block';\r\n    });\r\n\r\n    // Hide the popup when the cancel button is clicked\r\n    cancelButton.addEventListener('click', function() {\r\n        popup.style.display = 'none';\r\n    });\r\n\r\n    // Add a new project\r\n    addProjectButton.addEventListener('click', function() {\r\n        const projectName = inputProject.value.trim();\r\n        if (projectName !== '') {\r\n            (0,_projects_js__WEBPACK_IMPORTED_MODULE_0__.addProjectFromInput)(projectName);\r\n            inputProject.value = '';\r\n            popup.style.display = 'none';\r\n        } else {\r\n            alert('Please enter a project name.');\r\n        }\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://odin-todo/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProjectFromInput: () => (/* binding */ addProjectFromInput),\n/* harmony export */   loadProjects: () => (/* binding */ loadProjects)\n/* harmony export */ });\nfunction loadProjects() {\r\n    const projects = JSON.parse(localStorage.getItem('projects')) || [];\r\n    projects.forEach(function(projectName) {\r\n        addProject(projectName);\r\n    });\r\n}\r\n\r\nfunction addProjectFromInput(projectName) {\r\n    addProject(projectName);\r\n    saveProjects();\r\n}\r\n\r\nfunction addProject(projectName) {\r\n    const projectsList = document.getElementById('projects-list');\r\n\r\n    // Create a new project button\r\n    const newProjectButton = document.createElement('button');\r\n    newProjectButton.type = 'button';\r\n    newProjectButton.className = 'btn btn-danger btn-lg odin-btn odin-added-btn';\r\n    newProjectButton.innerHTML = `\r\n        <div class=\"left-project-panel\">\r\n            <i class=\"fas fa-check\"></i>\r\n            <span>${projectName}</span>\r\n        </div>\r\n        <div class=\"right-project-panel\">\r\n            <i class=\"fas fa-times delete-project\"></i>\r\n        </div>\r\n    `;\r\n\r\n    // Add event listener to the delete button\r\n    newProjectButton.querySelector('.delete-project').addEventListener('click', function() {\r\n        newProjectButton.remove();\r\n        saveProjects();\r\n    });\r\n\r\n    // Append the new project button to the projects list\r\n    projectsList.appendChild(newProjectButton);\r\n}\r\n\r\nfunction saveProjects() {\r\n    const projectsList = document.getElementById('projects-list');\r\n    const projects = [];\r\n    projectsList.querySelectorAll('.odin-added-btn').forEach(function(projectBtn) {\r\n        const projectName = projectBtn.querySelector('.left-project-panel span').textContent;\r\n        projects.push(projectName);\r\n    });\r\n    localStorage.setItem('projects', JSON.stringify(projects));\r\n}\r\n\n\n//# sourceURL=webpack://odin-todo/./src/projects.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;