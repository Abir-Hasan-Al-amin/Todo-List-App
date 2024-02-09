import React, { useEffect, useState } from "react";
import AddTaskModal from "./components/AddTaskModel";
import { IoMdAdd } from "react-icons/io";
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
    <div className=" flex justify-center items-center w-screen">
    <div className="flex w-5/6 md:w-4/6 mt-12 justify-between">
      <h1 className=" text-3xl  md:text-4xl font-bold">Todo List</h1>
      <button className=" flex items-center gap-1 md:gap-3 text-white bg-[#713FFF]  md:text-lg rounded-lg px-3 md:px-6 py-2 font-bold shadow-md" onClick={()=>setShowAddModal(true)}> <IoMdAdd size={22}/>Add Task</button>
      {showAddModal && (
        <AddTaskModal
          onAddTask={addTask}
          onCancel={() => setShowAddModal(false)}
        />
      )}    
    </div>
    </div>
  )
}

export default App
