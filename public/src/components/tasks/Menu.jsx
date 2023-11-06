import React, { useEffect, useState } from "react";
import { FaTasks, FaPlus, FaUserCog } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { IoMdNotifications } from "react-icons/io"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import NotificationDropdown from "./Notifications";

const Menu = () => {

    const { user } = useSelector(state => state.auth)
    const role = user.role
    console.log(user);

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:5000/sse/${role}`);
        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            console.log("eee", eventData);
            setNotifications((prevNotifications) => [...prevNotifications, eventData]);
            // if (role === "admin") setNotifications((prevNotifications) => [...prevNotifications, eventData]);
        }

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
        };

        return () => {
            // Clean up the EventSource when the component unmounts
            eventSource.close();
        };
    }, []);

    // console.log(notifications);



    // console.log(msg);

    return <ul className="menu bg-base-200 w-56 rounded-box">
        {
            user?.role === "admin" && (
                <li>
                    <Link to="/dashboard/admin">
                        <FaUserCog className="h-5 w-5 inline mr-2" />
                        Admin
                    </Link>
                </li>
            )
        }
        <li>
            <Link to="/dashboard">
                <FaTasks className="h-5 w-5 inline mr-2" />
                All Tasks
            </Link>
        </li>
        <li>
            <Link to="/dashboard/add">
                <FaPlus className="h-5 w-5 inline mr-2" />
                Add Task
            </Link>
        </li>
        <li>
            <Link to="/dashboard/settings">
                <FiSettings className="h-5 w-5 inline mr-2" />
                settings
            </Link>
        </li>
        {/* <li className="relative">
            <Link to="/dashboard/notifications" className="inline-flex items-center">
                <span className="relative">
                    <IoMdNotifications className="h-5 w-5 inline mr-2" />
                    <span className="bg-red-500 text-white absolute top-0 right-0 rounded-full w-4 h-4 flex items-center justify-center text-xs">
                        1
                    </span>
                </span>
                notifications
            </Link>
        </li> */}
       {/* 
        <li className="">
            <Link to="/dashboard/notifications" className="inline-flex items-center"> 
        <div className="relative">
            <NotificationDropdown notifications={notifications} />
        </div>
  
    </li>
       */}
    </ul>
};

export default Menu;
