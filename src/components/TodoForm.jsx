import React, { useEffect, useRef, useState } from 'react';
import TodoTasksList from './TodoTasksList';
import Button from './Button';
import style from './TodoForm.module.css';


export default function TodoForm() {

  const idTask = useRef(0);
  const inputRefTitle = useRef();

  const getItems = () => {
    return JSON.parse(localStorage.getItem('toDoList')) || [];
  };

  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [taskList, setTaskList] = useState(() => {
    const storedTasks = localStorage.getItem('toDoList');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [toDoList, setToDoList] = useState(getItems());
  const [showAlert, setShowAlert] = useState(false);
  const MemorizeTaskList = React.memo(TodoTasksList);

  const setItems = (items) => {
    localStorage.setItem('toDoList', JSON.stringify(items));
  };

  useEffect(() => {
    setItems(toDoList);
  }, [toDoList]);

  const submitTask = () => {

    if(task === "" &&  description === "" ){
      setShowAlert(true);
      return;
    } 

    idTask.current++;
    const newTask = { id: idTask.current, task, description, isCompleted: false };
    setTaskList((oldList) => [...oldList, newTask]);
    setToDoList((oldToDoList) => [...oldToDoList, newTask]);
    setItems([...toDoList, newTask]);
    setTask('');
    setDescription('');
    inputRefTitle.current.focus();
    setShowAlert(false)
  };

  const cleanTasks = () => {
    setTaskList([]);
    setToDoList([]);
    setItems([]);
    idTask.current = 0;
    console.log('apagar tudo');
  };

  const cleanDone = () => {
    const taskNow = taskList.filter((task) => !task.isCompleted);
    setTaskList(taskNow);
    setItems(taskNow);
  };

  return (
    <div className={style.main}>
      <main>
        <h1>Todo List</h1>
        <div className={style.taskOpen}>
          <input
            type="text"
            placeholder="Título"
            ref={inputRefTitle}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button label="Adicionar" onClick={submitTask} />
        </div>
      </main>
      {showAlert && <p className={style.alert}>Preencha um dos campos acima</p>}

      <hr />
      <section className={style.taskPanel}>
        <h3>Tarefas:</h3>
        <Button label="Apagar marcada" onClick={cleanDone} />
        <Button label="Apagar tudo" onClick={cleanTasks} />
      </section>
      <hr />

      <MemorizeTaskList 
        setTaskList={setTaskList}
        idTask={idTask}
        taskList={taskList}
        setItems={setItems} />
    </div>
  );
};