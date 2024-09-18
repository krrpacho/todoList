import React, { useState } from 'react';
import Modal from './Modal';

function TaskItem({ task }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="task" onClick={() => setShowModal(true)}>
      <h2>{task.title}</h2>
      <p>{task.date}</p>
      <span>Created on: {new Date(task.createdAt).toLocaleDateString()}</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Date: {task.date}</p>
          <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
          <p>Created on: {new Date(task.createdAt).toLocaleDateString()}</p>
        </Modal>
      )}
    </div>
  );
}

export default TaskItem;
