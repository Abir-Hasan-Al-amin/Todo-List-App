import React from "react";

export default function DeleteTaskModal({ onDelTask, onCancel , id }) {
    const handleAddTask = () => {
          onDelTask(id);
      };
  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-30 flex justify-center items-center">
       <div className="m-3 py-6 bg-white w-full md:w-[420px] rounded-md p-2 flex justify-center items-center flex-col gap-8">
      <div className="w-5/6 text-center">
        <h1 className=" text-2xl font-semibold">Press Delete To Remove The Task</h1>
      </div>
      <div className="flex w-5/6 justify-between">
      <button className=" text-white font-bold shadow-md bg-red-500 py-2 px-6 rounded-lg" onClick={handleAddTask}>Delete</button>
      <button className=" text-white font-bold shadow-md bg-gray-400 py-2 px-6 rounded-lg" onClick={onCancel}>Cancel</button>
      </div>
      </div>
    </div>
  );
}
