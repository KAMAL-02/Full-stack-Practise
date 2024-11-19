import { useEffect, useState } from "react";
import axios from "axios";

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-task");
        const data = response.data;
        setTasks(data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, []);
  return (
    <div>
      <h1 className="text-lg font-bold">Tasks list</h1>
      <ul>
        {tasks.map((task: any) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.isCompleted ? "Completed" : "Incomplete"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewTasks;
