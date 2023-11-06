import React, { useState, useEffect } from "react";
import { FaTable, FaTh } from 'react-icons/fa';
import TasksTable from "./TasksTable";
import TasksCard from "./TasksCard";
import Loading from "../index"
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

const TasksData = () => {

 let { tasksUI } = useSelector(state => state.tasks);
 const [viewMode, setViewMode] = useState("card");
 let { pagination } = useLoaderData();
 const totalProducts = pagination.total;

 // loading 
 const navigation = useNavigation()
 const isPageLoading = navigation.state === "loading"

 // Load the saved view mode from local storage on component mount
 useEffect(() => {
  const savedViewMode = localStorage.getItem("viewMode");
  if (savedViewMode) {
   setViewMode(savedViewMode);
  }
 }, []);

 const renderTasks = () => {
  if (tasksUI.length === 0) {
   return (
    <div className="flex flex-col items-center">
     <p className="text-gray-600 text-lg ">
      No tasks found.
     </p>
     {/* <Link to="/dashboard/add" className="text-primary">
      <button className="py-2 px-4 bg-primary text-white rounded">
       Add Task
      </button>
     </Link> */}
    </div>
   );
  }

  if (viewMode === "table") {
   return <TasksTable tasks={tasksUI} />
  } else if (viewMode === "card") {
   return <TasksCard tasks={tasksUI} />;
  }
 };

 // Save the selected view mode to local storage when it changes
 const handleViewModeChange = newViewMode => {
  setViewMode(newViewMode);
  localStorage.setItem("viewMode", newViewMode);
 };

 return (
  <main className="my-16 ">
   <div className="flex justify-start items-center mb-4">
    <button
     className={`mr-2 ${viewMode === "table" ? "text-primary" : "text-secondary"}`}
     onClick={() => handleViewModeChange("table")}
    >
     <FaTable className="mr-1" size={25} />
    </button>
    <button
     className={`${viewMode === "card" ? "text-primary" : "text-secondary"}`}
     onClick={() => handleViewModeChange("card")}
    >
     <FaTh className="mr-1" size={25} />
    </button>
    <h3 className="text-xl ml-3"><span className="font-bold text-green-500">{totalProducts}</span> tasks found</h3>
   </div>

   {renderTasks()}
  </main>
 );
};

export default TasksData;
