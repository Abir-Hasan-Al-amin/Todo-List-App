import React, { useEffect, useState } from "react";
import AddTaskModal from "./components/AddTaskModel";
import DeleteTaskModal from "./components/DeleteTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import { IoMdAdd, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState('All');
  const [newEditTask, setNewEditTask] = useState(null);
  const [newDeleteTask,setNewDeleteTask]=useState(null);
  // local storage setup
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      const parsedTasks = JSON.parse(storedTasks) || [];
      if (parsedTasks.length > 0) {
        setTasks(parsedTasks);
      } else {
        console.log("No tasks found in local storage.");
      }
    } catch (error) {
      console.error("Error loading tasks from local storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to local storage:", error);
    }
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowAddModal(false);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setDelModal(false);
  };

  const editTask = (id, editedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? editedTask : task))
    );
    setEditModal(false);
  };

  const toggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className=" bg-[#F0F2F5] flex flex-col items-center w-screen min-h-screen">
      <div className="flex w-5/6 lg:w-4/6 mt-12 justify-between">
        <h1 className=" text-3xl  md:text-4xl font-bold">Todo List</h1>
        <button
          className=" flex items-center gap-1 md:gap-3 text-white bg-[#713FFF]  md:text-lg rounded-lg px-3 md:px-6 py-2 font-bold shadow-md"
          onClick={() => setShowAddModal(true)}
        >
          <IoMdAdd size={22} />
          Add Task
        </button>
        {showAddModal && (
          <AddTaskModal
            onAddTask={addTask}
            onCancel={() => setShowAddModal(false)}
          />
        )}
      </div>
      <div  className="flex w-5/6 lg:w-3/6 mt-12 justify-between">
          <h1 className=" font-semibold md:text-xl text-red-400">Total Tasks : {tasks.length}</h1>
          <h1 className=" font-semibold md:text-xl text-green-400">Completed Tasks : {tasks.filter(task => task.completed).length}</h1>
      </div>
      <div className="flex flex-col lg:flex-row w-5/6 lg:w-4/6 mt-12 justify-center items-center gap-6">
        <h1 className="text-xl font-semibold text-neutral-600">Filter by Priority:</h1>
        <div>
            <ul className="flex justify-center gap-8 flex-wrap md:gap-2 font-semibold">
              <li
              className={`w-24 text-center border border-gray-400 p-2 px-3 rounded-md cursor-pointer ${
                filterPriority === "All"
                  ? " bg-gray-400 text-white"
                  : " text-gray-400"
              }`}
              onClick={() => setFilterPriority("All")}
            >
              All
            </li>
            <li
              className={`w-24 text-center border border-green-400 p-2 px-3 rounded-md cursor-pointer ${
                filterPriority === "Low"
                  ? " bg-green-400 text-white"
                  : " text-green-400"
              }`}
              onClick={() => setFilterPriority("Low")}
            >
              Low
            </li>
            <li
              className={`w-24 text-center border border-yellow-500 p-2 px-3 rounded-md cursor-pointer ${
                filterPriority === "Medium"
                  ? " bg-yellow-500 text-white"
                  : " text-yellow-500"
              }`}
              onClick={() => setFilterPriority("Medium")}
            >
              Medium
            </li>
            <li
              className={`w-24 text-center border border-red-500 p-2 px-3 rounded-md cursor-pointer ${
                filterPriority === "High"
                  ? "bg-red-500 text-white"
                  : " text-red-500"
              }`}
              onClick={() => setFilterPriority("High")}
            >
              High
            </li>
          </ul>
      </div>
  </div>
      {tasks.filter((task) =>filterPriority === 'All' ? true : task.priority === filterPriority).map((task) => (
        <div
          className={`${task.completed === true ? " bg-green-100":" bg-white"}  rounded-2xl p-6 flex w-5/6 lg:w-4/6 mt-12 gap-4 lg:gap-0 lg:justify-between lg:items-center flex-col lg:flex-row`}
          key={task.id}
        >
          <div className="flex items-center gap-4">
            <button className=" text-neutral-600" onClick={()=>toggle(task.id)}>
              <IoMdCheckmarkCircleOutline className={`${task.completed=== true?" text-green-500":""}`} size={26} />
            </button>
            <p className={`${task.completed=== true?" bg-green-500":" bg-[#ECEEEF]"} text-lg font-semibold text-neutral-600  p-2 rounded-xl w-20 text-center`}>
              {task.completed ? "Done" : "To-Do"}
            </p>
          </div>
          <div>
            <h1 className=" text-neutral-600">Task</h1>
            <p className=" text-lg font-semibold lg:w-[350px]">{task.text}</p>
          </div>
          <div>
            <h1 className=" text-neutral-600">Priority</h1>
            <p
              className={`text-lg font-semibold ${
                task.priority === "Low"
                  ? "text-green-500"
                  : task.priority === "Medium"
                  ? "text-yellow-500"
                  : task.priority === "High"
                  ? "text-red-500"
                  : ""
              }`}
            >
              {task.priority}
            </p>
          </div>
          <div className="flex gap-4">
            <button className=" text-green-500" onClick={() =>{ setEditModal(true); setNewEditTask(task)}}>
              <BiEdit size={26} />
            </button>
            {editModal && (
                  <EditTaskModal
                    onEditTask={editTask}
                    onCancel={() => {setEditModal(false); setNewEditTask(null)}}
                    task={newEditTask}
                  />
                )}
            <button className=" text-red-500" onClick={() => {setDelModal(true);setNewDeleteTask(task.id)}}>
              <FaTrashCan size={22} />
            </button>
            {delModal && (
              <DeleteTaskModal
                onDelTask={deleteTask}
                onCancel={() => {setDelModal(false);setNewDeleteTask(null)}}
                id={newDeleteTask}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;