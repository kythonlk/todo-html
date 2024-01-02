document.addEventListener('DOMContentLoaded', function() {
  const allTasksElement = document.getElementById('all-tasks');
  allTasksElement.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const date = localStorage.key(i);
    const tasks = JSON.parse(localStorage.getItem(date));

    const dateDiv = document.createElement('div');
    dateDiv.innerHTML = `<h3 class="listH">Tasks for ${date}</h3>`;

    const taskList = document.createElement('ul');

    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task.task;
      taskList.appendChild(taskItem);
    });

    dateDiv.appendChild(taskList);
    allTasksElement.appendChild(dateDiv);
  }
});

