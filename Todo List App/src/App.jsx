import React, { useEffect, useState } from "react";
import AddTaskModal from "./components/AddTaskModel";
import { IoMdAdd, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

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

  return (
    <div className=" bg-[#F0F2F5] flex flex-col items-center w-screen min-h-screen">
      <div className="flex w-5/6 lg:w-4/6 mt-12 justify-between">
        <h1 className=" text-3xl  md:text-4xl font-bold">Todo List</h1>
        <button
          className=" flex items-center gap-1 md:gap-3 text-white bg-[#713FFF]  md:text-lg rounded-lg px-3 md:px-6 py-2 font-bold shadow-md"
          onClick={() => setShowAddModal(true)}
        >
          {" "}
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
      {tasks.map((task) => (
        <div className=" bg-white  rounded-2xl p-6 flex w-5/6 lg:w-4/6 mt-12 gap-4 lg:gap-0 lg:justify-between lg:items-center flex-col lg:flex-row" key={task.id}>
          <div className="flex items-center gap-4">
            <button className=" text-neutral-600">
              <IoMdCheckmarkCircleOutline size={26} />
            </button>
            <p className=" text-lg font-semibold text-neutral-600 bg-[#ECEEEF] p-2 rounded-xl">
              {task.completed ? "Done" : "To-Do"}
            </p>
          </div>
          <div>
            <h1 className=" text-neutral-600">Task</h1>
            <p className=" text-lg font-semibold lg:w-[350px]">
              {task.text}
            </p>
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
            <button className=" text-green-500">
              <BiEdit size={26} />
            </button>
            <button className=" text-red-500">
              <FaTrashCan size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
