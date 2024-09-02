const Subtasks = ({ subTasks, updateSubTaskStatus }) => {
  return (
    <ul className="list-disc pl-5">
      {subTasks.map((subTask, index) => (
        <li key={index} className="flex items-center">
          <input
            type="checkbox"
            checked={subTask.done}
            onChange={() => updateSubTaskStatus(index)}
            className="mr-2"
          />
          <span>{subTask.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default Subtasks;
