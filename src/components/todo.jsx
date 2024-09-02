const TodoList = ({ allTodos, kanbanColumns, updateSubTaskStatus, deleteTodo, updateTodoStatus }) => {
  return (
    <div className="mt-6">
      {Object.keys(allTodos).map((dateKey) => (
        <div key={dateKey} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{dateKey}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kanbanColumns.map((column) => (
              <div key={column} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">{column}</h3>
                {allTodos[dateKey]
                  .filter((todo) => todo.status === column)
                  .map((todo, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-2 shadow">
                      <h4 className="font-bold">{todo.title}</h4>
                      <p>{todo.description}</p>
                      <ul className="mt-2">
                        {todo.subTasks.map((subTask, subIndex) => (
                          <li key={subIndex} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              checked={subTask.done}
                              onChange={() => updateSubTaskStatus(dateKey, index, subIndex)}
                              className="mr-2"
                            />
                            <span className={subTask.done ? "line-through" : ""}>
                              {subTask.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2">
                        {kanbanColumns.map((col) => (
                          col !== column && (
                            <button
                              key={col}
                              onClick={() => updateTodoStatus(dateKey, index, col)}
                              className="bg-blue-500 dark:bg-blue-600 text-white px-2 py-1 rounded-lg mr-2"
                            >
                              Move to {col}
                            </button>
                          )
                        ))}
                        <button
                          onClick={() => deleteTodo(dateKey, index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
