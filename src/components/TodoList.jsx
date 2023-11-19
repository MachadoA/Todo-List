import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [task, setTask] = useState('');
  const [toDoList, setToDoList] = useState(getItems());

  function getItems() {
    return JSON.parse(localStorage.getItem('toDoList')) ?? [];
  }

  function setItems(items) {
    localStorage.setItem('toDoList', JSON.stringify(items));
  }

  function createItem(item, id) {
    return (
      <li key={id} className="item">
        <input
          type="checkbox"
          checked={item.status === 'checked'}
          onChange={() => updateItem(id)}
        />
        <span>{item.task}</span>
        <input
          className="trash"
          type="button"
          value="🗑️"
          onClick={() => removeItem(id)}
        />
      </li>
    );
  }

  function refresh() {
    return getItems().map((item, id) => createItem(item, id));
  }

  function addItem(e) {
    if (e.key === 'Enter') {
      const items = getItems();
      items.push({ task, status: '' });
      setItems(items);
      setTask('');
    }
  }

  function removeItem(id) {
    const items = getItems();
    items.splice(id, 1);
    setItems(items);
  }

  function updateItem(id) {
    const items = getItems();
    items[id].status = items[id].status === '' ? 'checked' : '';
    setItems(items);
  }

  useEffect(() => {
    setToDoList(getItems());
  }, []);

  useEffect(() => {
    setItems(toDoList);
  }, [toDoList]);

  return (
    <div>
      <h1>My To-Do List</h1>
      <ul id="myList">
        {toDoList.map((item, id) => createItem(item, id))}
      </ul>
      <input
        type="text"
        id="taskDescription"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={addItem}
        placeholder="Add a new task..."
      />
    </div>
  );
};

export default ToDoList;
