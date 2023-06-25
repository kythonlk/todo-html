
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const dateElement = document.getElementById('date');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task.task}</span>
      <button onclick="deleteTask(${index})">Delete</button>
      <button onclick="editTask(${index})">Edit</button>
    `;
    taskList.appendChild(listItem);
  });
}

function addTask(event) {
  event.preventDefault();

  const newTask = taskInput.value.trim();

  if (newTask !== '') {
    const task = {
      task: newTask
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const updatedTask = prompt('Update task:', tasks[index].task);

  if (updatedTask !== null && updatedTask.trim() !== '') {
    tasks[index].task = updatedTask.trim();
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  const selectedDate = new URLSearchParams(window.location.search).get('date');
  localStorage.setItem(selectedDate, JSON.stringify(tasks));
}

function loadTasks() {
  const selectedDate = new URLSearchParams(window.location.search).get('date');
  const storedTasks = localStorage.getItem(selectedDate);

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }

  dateElement.textContent = selectedDate;
}

function goToHome() {
  window.location.href = './index.html';
}

taskForm.addEventListener('submit', addTask);
window.addEventListener('load', loadTasks);
