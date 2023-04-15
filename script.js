    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', function(event) {
    event.preventDefault();
    const taskText = taskInput.value;
    if (taskText === '') {
        return;
    }
    const task = document.createElement('div');
    task.classList.add('task');
    task.innerHTML = taskText;
    taskList.appendChild(task);
    taskInput.value = '';
    });

    taskList.addEventListener('click', function(event) {
    const task = event.target;
    if (task.classList.contains('task')) {
        task.remove();
    }
    });
