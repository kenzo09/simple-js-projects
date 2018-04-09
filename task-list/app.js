// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Verify if 'tasks' key of local storage is empty, then return an array
function getLocalStorageTasks() {
  return localStorage.getItem('tasks') !== null ?
    JSON.parse(localStorage.getItem('tasks')) : [];
}

// Get Tasks from local storage
function getTasks() {
  let tasks = getLocalStorageTasks();

  tasks.forEach(task => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  if (taskInput.value === '') {
    alert('Please, add a task');
  } else {
    taskList.appendChild(li);
    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);
  }

  // Cleat input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task in local storage
function storeTaskInLocalStorage(task) {
  let tasks = getLocalStorageTasks();

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks = getLocalStorageTasks();

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Clear Tasks
function clearTasks(e) {
  // taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks from local storage
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document
    .querySelectorAll('.collection-item')
    .forEach(task => {
      const item = task.firstChild.textContent;
      if (item.toLocaleLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}