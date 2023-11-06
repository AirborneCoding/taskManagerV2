import React from "react";
import { Link } from "react-router-dom";
import { logout, toggleTheme } from "../../redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux";
const profileImg =
  "https://media.istockphoto.com/id/1332740422/vector/businessman-avatar-flat-icon-flat-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=YpblL2rT13oHL_2AxBxHtD3Eg4kwigENBDZNN8p30Sw="
const Navbar = () => {
  const dispatch = useDispatch()
  const { theme, user } = useSelector(state => state.auth);

  return (
    <div className={`bg-sky-200`}>
      <div className="body-container navbar flex justify-between items-center">
        <Link to="/">
          <h4 className="normal-case text-xl text-gray-500 hover:text-gray-700 font-bold">Task-Manager</h4>
        </Link>
        <div className="flex gap-2 items-center">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-end">
                {/* btn btn-ghost btn-circle avatar */}
                <span tabIndex={0} className="flex avatar items-end space-x-3 cursor-pointer ">
                  <span className="pb-2 text-black">{user.name}</span>
                  <div className="w-10 rounded-full border hover:border-sky-900 active:border-sky-900">
                    <img src={profileImg} alt="Profile" />
                  </div>
                </span>
                <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <Link to="/dashboard">
                    <li>Dashboard</li>
                  </Link>
                  <Link to="/" onClick={() => dispatch(logout())}>
                    <li>Logout</li>
                  </Link>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register" className="btn  btn-sm">Register</Link>
                <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            </>
          )}
          <div className={`app`}>
            <input
              onChange={() => dispatch(toggleTheme())}
              type="checkbox"
              className="toggle"
            // checked={theme === "dark"}
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
