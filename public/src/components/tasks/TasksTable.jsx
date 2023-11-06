import React, { useState } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch } from "react-redux"
import { deleteTask } from "../../redux/api/authApiCall";
import { useNavigate } from "react-router-dom";
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

    const [selectedTasks, setSelectedTasks] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleCheckboxChange = (taskId) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter(_id => _id !== taskId));
        } else {
            setSelectedTasks([...selectedTasks, taskId]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedTasks([]);
        } else {
            const allTaskIds = tasks.map(item => item._id);
            setSelectedTasks(allTaskIds);
        }
        setSelectAll(!selectAll);
    };

    // console.log(selectedTasks);

    return (
        <div className="overflow-x-auto">
            <table className="table ">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </label>
                        </th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Is Completed</th>
                        <th>Actions</th>

                    </tr>
                </thead>

                <tbody>
                    {tasks.map((item) => {
                        return <tr key={item._id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox"
                                        checked={selectedTasks.includes(item._id)}
                                        onChange={() => handleCheckboxChange(item._id)}
                                    />
                                </label>
                            </th>
                            <td>
                                {item?.title}
                            </td>
                            <td>
                                {item?.category}
                            </td>
                            <td>
                                {item?.status}
                            </td>
                            <td className={item?.completed === true ? "text-green-500" : "text-red-500"}>{item?.completed ? 'completed' : 'incomplete'}</td>
                            <td className="flex space-x-2">
                                <button onClick={() => handleEdit(item._id, { ...item })}>
                                    <FaEdit className="text-success" />
                                </button>
                                <button onClick={() => hendleDelete(item?._id)}>
                                    <FaTrash className="text-red-600" />
                                </button>
                            </td>
                            {/* <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th> */}
                        </tr>
                    })}
                </tbody>
            </table >
        </div >
    )
};

export default TasksTable;