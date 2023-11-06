import React, { useState } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';

// actions
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask } from "../../redux/api/authApiCall";
import { setIsEdit } from "../../redux/slices/tasksSlice";

const TasksTable = ({ tasks }) => {

    const dispatch = useDispatch()

    const hendleDelete = (taskID) => {
        dispatch(deleteTask(taskID))
    }

    const navigate = useNavigate()
    const handleEdit = (taskID, item) => {
        dispatch(setIsEdit({ state: true, id: taskID, item: item }))
        navigate("/dashboard/add")
    }

    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5 ">
            {
                tasks.map((item) => {
                    return <div key={item._id} className="card bg-base-100  shadow-xl">
                        <div className="card-body space-y-2">
                            <h2 className="card-title">
                                {item?.title}
                                {/* <div className="badge badge-secondary">NEW</div> */}
                            </h2>
                            <div className="space-y-3">
                                <p>
                                    <span className="font-bold text-sky-500 capitalize">created date : </span>
                                    {item?.createdAt}
                                </p>
                                <p>
                                    <span className="font-bold text-sky-500 capitalize">updated date : </span>
                                    {item?.updatedAt}
                                </p>
                            </div>
                            <hr />
                            <p>
                                <span className="font-bold text-sky-500 capitalize">details : </span>
                                <br /><br />
                                {item?.description}
                            </p>
                            <hr />
                            <div className="card-actions justify-end">
                                {/* <button className="badge badge-outline">Details</button> */}
                                <button onClick={() => handleEdit(item._id, { ...item })}>
                                    <FaEdit className="text-success" /></button>
                                <button onClick={() => hendleDelete(item._id)}>
                                    <FaTrash className="text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
};

export default TasksTable;
