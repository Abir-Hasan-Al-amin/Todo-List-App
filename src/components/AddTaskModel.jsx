import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
export default function AddTaskModal({ onAddTask, onCancel }) {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask({
        id: Date.now(),
        text: newTask,
        priority: priority,
        completed: false,
      });
      setNewTask("");
      setPriority("low");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-30 flex justify-center items-center">
      <div className="m-3 py-6 bg-white w-full md:w-[420px] rounded-md p-2 flex justify-center items-center flex-col gap-8">
        <div className="flex w-5/6 justify-between">
          <h1 className="text-2xl font-bold">Add Task</h1>
          <button onClick={onCancel}>
            <IoClose size={22} />
          </button>
        </div>
        <div className="flex flex-col gap-2 w-5/6">
          <h1 className="font-bold text-gray-600">Task:</h1>
          <input
            placeholder="Write your task here...."
            className="outline-none border border-black rounded-md text-lg p-2"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-5/6">
          <label className="font-bold text-gray-600">Priority:</label>
          <div>
            <ul className="flex gap-1 font-semibold">
              <li
                className={`w-24 text-center border border-green-400 p-2 px-3 rounded-md cursor-pointer ${
                  priority === "Low"
                    ? " bg-green-400 text-white"
                    : " text-green-400"
                }`}
                onClick={() => setPriority("Low")}
              >
                Low
              </li>
              <li
                className={`w-24 text-center border border-yellow-500 p-2 px-3 rounded-md cursor-pointer ${
                  priority === "Medium"
                    ? " bg-yellow-500 text-white"
                    : " text-yellow-500"
                }`}
                onClick={() => setPriority("Medium")}
              >
                Medium
              </li>
              <li
                className={`w-24 text-center border border-red-500 p-2 px-3 rounded-md cursor-pointer ${
                  priority === "High"
                    ? "bg-red-500 text-white"
                    : " text-red-500"
                }`}
                onClick={() => setPriority("High")}
              >
                High
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex justify-end px-6">
          <button
            className={`text-white font-bold px-6 py-3 rounded-lg bg-[#713FFF] ${
              newTask.trim() === "" ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleAddTask}
            disabled={newTask.trim() === ""}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
