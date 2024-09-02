import { useState } from 'react';

const Settings = ({ kanbanColumns, setKanbanColumns }) => {
  const [newColumn, setNewColumn] = useState('');

  const addColumn = () => {
    if (newColumn.trim() !== '' && !kanbanColumns.includes(newColumn.trim())) {
      setKanbanColumns([...kanbanColumns, newColumn.trim()]);
      localStorage.setItem('kanbanColumns', JSON.stringify([...kanbanColumns, newColumn.trim()]));
      setNewColumn('');
    }
  };

  const deleteColumn = (column) => {
    const updatedColumns = kanbanColumns.filter(col => col !== column);
    setKanbanColumns(updatedColumns);
    localStorage.setItem('kanbanColumns', JSON.stringify(updatedColumns));
  };

  return (
    <div className="absolute top-0 right-0 w-1/4 bg-white dark:bg-gray-800 dark:text-white p-6 shadow-lg rounded-lg z-50">
      <h3 className="text-lg font-bold mb-4">Settings</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Kanban Columns:</h4>
        <ul>
          {kanbanColumns.map((column, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{column}</span>
              <button
                onClick={() => deleteColumn(column)}
                className="text-red-500 hover:text-red-700"
              >
                ✖️
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          placeholder="Add new column"
          className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={addColumn}
          className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg w-full mt-4"
        >
          Add Column
        </button>
      </div>
    </div>
  );
};

export default Settings;
