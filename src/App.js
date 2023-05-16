import './App.css';
import {useState} from 'react'

function App() {

  const [Tasks, setTasks] = useState ([ 
    { id: 1, name: "Walk the dog", priority: "High"},
    { id: 2, name: "Cook Dinner", priority: "High"},
    { id: 3, name: "Cut the grass", priority: "Low"}
  ])

  const [newTask, setNewTask] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState('low');

  const completeTask = (TasksID) => {
    console.log("completed button Clicked on:", TasksID)
    const newTasks = Tasks.filter ((tasks) => tasks.id !==TasksID)
    setTasks(newTasks)
  }

  const listTasks = Tasks.map((task) => {
    return (
      <li
        key={task.id}
        className={`task ${task.priority === 'high' ? 'high-priority' : 'low-priority'}`}
      >
        {task.name}
        <button onClick={() => completeTask(task.id)}>completed</button>
      </li>
    );
  });

 

  const handleTaskInput = (event) => {
    setNewTask (event.target.value)
  }

  const handlePriorityChange = (event) => {
    setNewTaskPriority(event.target.value);
  }

    const saveNewTask= (event) =>{ 
    event.preventDefault()

  
    const newTaskobj = { id: Date.now (), name: newTask,  priority: newTaskPriority,}
    const nextTasks = [...Tasks, newTaskobj]
    setTasks (nextTasks) 
    setNewTask ("")
    setNewTaskPriority('low');

  }

  return (
    <div className="App">
      <h1>ToDo's</h1>
      <form onSubmit={saveNewTask} className="form-container">
        <label htmlFor="new-task">Add a new ToDo:</label>
        <input
          id="new-task"
          type="text"
          value={newTask}
          onChange={handleTaskInput}
        />
        <div>
          <label>
            <input
              type="radio"
              name="priority"
              value="low"
              checked={newTaskPriority === 'low'}
              onChange={handlePriorityChange}
            />
            <span className="priority-button low">Low </span>
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="high"
              checked={newTaskPriority === 'high'}
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