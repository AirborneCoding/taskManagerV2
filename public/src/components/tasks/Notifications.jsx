import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdNotifications } from 'react-icons/io';

function NotificationDropdown({ notifications }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex justify-between space-x-9"
            >
                <div className="flex space-x-2">
                    <IoMdNotifications className="h-5 w-5 inline mr-2" />
                    <p>Add Task</p>
                </div>
                {
                    notifications.length > 0 && (
                        <p className='bg-red-500 rounded-full w-5 h-5 font-bold pt-0.5' >{notifications.length}</p>
                    )
                }
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-fit bg-white rounded-lg shadow-lg">
                    <ul className="py-2">
                        {
                            notifications.map((item) => {
                                return <li key={item.id} className="px-4 py-2 hover:bg-gray-200">{item.msg}</li>
                            })
                        }

                    </ul>
                </div>
            )}
        </div>
    );
}

// test user service roles users

export default NotificationDropdown;
