import style from './TodoTasksList.module.css'
import Button from './Button'

export default function TodoTasksList({setTaskList, idTask, taskList, setItems}) {

    const deleteTask = (id) =>{
        const taskNow = taskList.filter(task => task.id !== id);
        setTaskList(taskNow);
        setItems(taskNow);
    }

    const toggleCompleted = (taskId) => {
        setTaskList((prevTaskList) =>
          prevTaskList.map((task) => {
            return task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task;
          })
        );
    }
      
  return (
    <section className={style.taskList}>
      {taskList &&
        taskList.map((t) => (
          <article className={`${style.task} ${t.isCompleted ? style.isCompleted : ''}`} key={t.id}>
            <div className={style.checkbox}>
              <input
                type="checkbox"
                id={`checkbox-${t.id}`}
                onChange={() => toggleCompleted(t.id)}
                checked={t.isCompleted}
              />
              <label htmlFor={`checkbox-${t.id}`} />
            </div>
            <div>
              <h3>{t.task}</h3>
              <p className={style.taskDescription}>{t.description}</p>
            </div>
            <Button label="🗑️" onClick={() => deleteTask(t.id)} />
          </article>
        ))}
    </section>
  );
}
