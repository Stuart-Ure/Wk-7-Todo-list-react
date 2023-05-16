import './App.css';
import { useState } from 'react';

function App() {
  const [Tasks, setTasks] = useState([
    { id: 1, name: "Walk the dog", priority: "low" },
    { id: 2, name: "Cook Dinner", priority: "high" },
    { id: 3, name: "Cut the grass", priority: "low" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("low");

  const completeTask = (taskId) => {
    console.log("Completed button clicked on task:", taskId);
    const updatedTasks = Tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const listTasks = Tasks.map((task) => {
    return (
      <li
        key={task.id}
        className={`task ${task.priority === "high" ? "high-priority" : "low-priority"}`}
      >
        {task.name}
        <button onClick={() => completeTask(task.id)}>completed</button>
      </li>
    );
  });

  const handleTaskInput = (event) => {
    setNewTask(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setNewTaskPriority(event.target.value);
  };

  const saveNewTask = (event) => {
    event.preventDefault();

    const newTaskObj = { id: Date.now(), name: newTask, priority: newTaskPriority };
    const updatedTasks = [...Tasks, newTaskObj];
    setTasks(updatedTasks);
    setNewTask("");
    setNewTaskPriority("low");
  };

  return (
    <div className="App">
      <h1> <b> My To-do List </b> </h1> 
      <form onSubmit={saveNewTask} className="form-container">
        <label htmlFor="new-task"> <b> Add a new Task to the List: </b> </label>
        <input id="new-task" type="text" value={newTask} onChange={handleTaskInput} />
        <div>
          <label>
            <input
              type="radio"
              name="priority"
              value="low"
              checked={newTaskPriority === "low"}
              onChange={handlePriorityChange}
            />
            <span className="priority-button low">Low</span>
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="high"
              checked={newTaskPriority === "high"}
              onChange={handlePriorityChange}
            />
            <span className="priority-button high">High</span>
          </label>
        </div>
        <input type="submit" value="Save Task" id="save-task-button" />
      </form>
      <hr />
      <ul className="task-list">{listTasks}</ul>
    </div>
  );
}

export default App;
