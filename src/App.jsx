import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import Calendar from './components/Calendar';
import Modal from './components/Modal';

function App() {
  const [search, setSearch] = useState('');
  const [showUncompleted, setShowUncompleted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', date: '' });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

 
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);


  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const updatedTasks = [
        ...tasks,
        { ...newTask, completed: false, createdAt: new Date().toISOString() }
      ];
      setTasks(updatedTasks); 
      setNewTask({ title: '', description: '', date: '' }); 
      setShowAddTaskModal(false); 
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };


  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };


  const handleSort = () => {
    const filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (!start || taskDate >= start) && (!end || taskDate <= end);
    });
    return filteredTasks;
  };


  const handleSortTasks = () => {
    setShowSortModal(true);
  };


  const handleResetDates = () => {
    setStartDate('');
    setEndDate('');
  };

  const sortedTasks = handleSort();

  return (
    <div className="App">

      <div className="left-panel">
        <header className="header">
          <input 
            type="text" 
            placeholder="Поиск задач"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </header>

        <div className="sidebar">
          <button>Сегодня</button>
          <button>На неделю</button>
          <label>
            <input 
              type="checkbox" 
              checked={showUncompleted}
              onChange={() => setShowUncompleted(!showUncompleted)}
            />
            Только невыполненные
          </label>
          <Calendar />
          <button className="add-task-button" onClick={() => setShowAddTaskModal(true)}>+</button>
        </div>
      </div>


      <div className="right-panel">
        <button className="sort-button" onClick={handleSortTasks}>Сортировка по дате</button>
        <TaskList 
          tasks={sortedTasks} 
          search={search} 
          showUncompleted={showUncompleted} 
          onToggleCompletion={toggleTaskCompletion} 
          onDeleteTask={handleDeleteTask}
        />
      </div>


      {showAddTaskModal && (
        <Modal onClose={() => setShowAddTaskModal(false)}>
          <h2>Новая задача</h2>
          <input
            type="text"
            placeholder="Название"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="modal-input"
          />
          <textarea
            placeholder="Описание"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="modal-textarea"
          />
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            className="modal-date"
          />
          <button className="modal-button" onClick={handleAddTask}>Добавить задачу</button>
          <button className="modal-button" onClick={() => setShowAddTaskModal(false)}>Закрыть</button>
        </Modal>
      )}

      {showSortModal && (
        <Modal onClose={() => setShowSortModal(false)}>
          <h2>Сортировать задачи по дате</h2>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="modal-date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="modal-date"
          />
          <div className="modal-buttons">
            <button onClick={handleSort} className="modal-button">Сортировать</button>
            <button onClick={handleResetDates} className="modal-button">Сбросить</button>
            <button onClick={() => setShowSortModal(false)} className="modal-button">Закрыть</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
