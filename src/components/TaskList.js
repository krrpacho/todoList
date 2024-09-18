import React from 'react';

const TaskList = ({ tasks, search, showUncompleted, onToggleCompletion, onDeleteTask }) => {
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesCompletion = !showUncompleted || !task.completed;
    return matchesSearch && matchesCompletion;
  });

  return (
    <div>
      {filteredTasks.map((task, index) => (
        <div key={index} className="task">
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleCompletion(index)}
            />
            <span className="task-title">{task.title}</span>
            <span className="task-date">{new Date(task.createdAt).toLocaleDateString()}</span>
            <button className="delete-button" onClick={() => onDeleteTask(index)}>Удалить</button>
          </div>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;//
