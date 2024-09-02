import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Settings from './components/settings';
import TodoList from './components/todo';


const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allTodos, setAllTodos] = useState({});
  const [newTodo, setNewTodo] = useState({ title: "", description: "", subTasks: [], status: "Pending" });
  const [kanbanColumns, setKanbanColumns] = useState(["Pending", "In Progress", "Done"]);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    loadTodos();
    const storedColumns = JSON.parse(localStorage.getItem('kanbanColumns'));
    if (storedColumns) {
      setKanbanColumns(storedColumns);
    }

    const darkModePref = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkModePref);
  }, []);

  const loadTodos = () => {
    let todos = {};
    for (let i = 0; i < localStorage.length; i++) {
      const date = localStorage.key(i);
      if (date !== 'kanbanColumns' && date !== 'darkMode') {
        todos[date] = JSON.parse(localStorage.getItem(date));
      }
    }
    setAllTodos(todos);
  };

  const addTodo = () => {
    if (newTodo.title.trim() === "") return;
    const dateKey = selectedDate.toLocaleDateString();
    const updatedTodos = allTodos[dateKey] ? [...allTodos[dateKey], newTodo] : [newTodo];
    localStorage.setItem(dateKey, JSON.stringify(updatedTodos));
    setAllTodos({ ...allTodos, [dateKey]: updatedTodos });
    setNewTodo({ title: "", description: "", subTasks: [], status: "Pending" });
  };

  const addSubTask = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== "") {
      setNewTodo({
        ...newTodo,
        subTasks: [...newTodo.subTasks, { title: e.target.value, done: false }]
      });
      e.target.value = "";
    }
  };

  const updateSubTaskStatus = (dateKey, todoIndex, subTaskIndex) => {
    const todosForDate = allTodos[dateKey];
    if (!todosForDate || todosForDate.length === 0) return;

    const updatedTodos = todosForDate.map((todo, index) => {
      if (index === todoIndex) {
        const updatedSubTasks = todo.subTasks.map((subTask, idx) => {
          if (idx === subTaskIndex) {
            return { ...subTask, done: !subTask.done };
          }
          return subTask;
        });
        return { ...todo, subTasks: updatedSubTasks };
      }
      return todo;
    });

    localStorage.setItem(dateKey, JSON.stringify(updatedTodos));
    setAllTodos({ ...allTodos, [dateKey]: updatedTodos });
  };

  const deleteTodo = (dateKey, index) => {
    const todosForDate = allTodos[dateKey];
    if (!todosForDate || todosForDate.length === 0) return;

    const updatedTodos = todosForDate.filter((_, i) => i !== index);

    if (updatedTodos.length === 0) {
      localStorage.removeItem(dateKey);
      const updatedAllTodos = { ...allTodos };
      delete updatedAllTodos[dateKey];
      setAllTodos(updatedAllTodos);
    } else {
      localStorage.setItem(dateKey, JSON.stringify(updatedTodos));
      setAllTodos({ ...allTodos, [dateKey]: updatedTodos });
    }
  };

  const updateTodoStatus = (dateKey, todoIndex, newStatus) => {
    const todosForDate = allTodos[dateKey];
    if (!todosForDate || todosForDate.length === 0) return;

    const updatedTodos = todosForDate.map((todo, index) => {
      if (index === todoIndex) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });

    localStorage.setItem(dateKey, JSON.stringify(updatedTodos));
    setAllTodos({ ...allTodos, [dateKey]: updatedTodos });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-6 relative">
          <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

          <div className="flex justify-between">
            <button
              onClick={() => setSettingsVisible(!settingsVisible)}
              className="text-gray-600 dark:text-gray-300"
            >
              ⚙️
            </button>
            <button
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>

          {settingsVisible && (
            <div ref={settingsRef}>
              <Settings kanbanColumns={kanbanColumns} setKanbanColumns={setKanbanColumns} />
            </div>
          )}

          <div className="my-4">
            <label className="block mb-2">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="my-4">
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="my-4">
            <label className="block mb-2">Description:</label>
            <textarea
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>

          <div className="my-4">
            <label className="block mb-2">Subtasks:</label>
            <input
              type="text"
              placeholder="Add a subtask and press Enter"
              onKeyPress={addSubTask}
              className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <ul className="mt-2">
              {newTodo.subTasks.map((subTask, index) => (
                <li key={index} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={subTask.done}
                    onChange={() => {
                      const updatedSubTasks = newTodo.subTasks.map((task, i) =>
                        i === index ? { ...task, done: !task.done } : task
                      );
                      setNewTodo({ ...newTodo, subTasks: updatedSubTasks });
                    }}
                    className="mr-2"
                  />
                  <span className={subTask.done ? "line-through" : ""}>{subTask.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={addTodo}
            className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg w-full mt-4"
          >
            Add Todo
          </button>

          <TodoList
            allTodos={allTodos}
            kanbanColumns={kanbanColumns}
            updateSubTaskStatus={updateSubTaskStatus}
            deleteTodo={deleteTodo}
            updateTodoStatus={updateTodoStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
