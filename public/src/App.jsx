/* import React, { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

// pages
import {
  HomeLayout,
  Landing,
  NotFoundError,
  Login,
  Register,
  About,
  Dashboard,
  TaskList,
  TaskForms,
  Admin,
  Settings
} from "./pages"
// actions && loaders
import { registerAction as registerAction } from "./redux/api/authApiCall"
import { loginAction as loginAction } from "./redux/api/authApiCall"
import { loaderTasks as loaderTasks } from "./redux/api/authApiCall"
import { MixedAction as MixedAction } from "./redux/api/authApiCall"
import { updateUserAction as updateUserAction } from "./redux/api/authApiCall"

import { store } from "./redux/store"

// const user = JSON.parse(localStorage.getItem("user"))

const getUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem("user");
  return userJSON ? JSON.parse(userJSON) : "";
};

const user = getUserFromLocalStorage();
const getRole = user?.role === "admin" ? true : false;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundError />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,

        children: [
          {
            index: true,
            element: <TaskList />,
            loader: loaderTasks(store),
          },
          {
            path: "add",
            element: <TaskForms />,
            action: MixedAction(store),
          },
          {
            path: "admin",
            element: (getRole && user) ? <Admin /> : <Navigate to="/" />,
          },
          {
            path: "settings",
            element: <Settings />,
            action: updateUserAction(store)
          }
        ]
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction(store)
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction
  },
]);


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );



};

export default App;
 */

import React from "react";
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  NotFoundError,
  Login,
  Register,
  About,
  Dashboard,
  TaskList,
  TaskForms,
  Admin,
  Settings
} from "./pages";

import {
  registerAction,
  loginAction,
  loaderTasks,
  MixedAction,
  updateUserAction
} from "./redux/api/authApiCall";

import { store } from "./redux/store";

const getUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem("user");
  return userJSON ? JSON.parse(userJSON) : null;
};

const App = () => {
  const user = getUserFromLocalStorage();
  const isAdmin = user?.role === "admin";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <NotFoundError />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              index: true,
              element: <TaskList />,
              loader: loaderTasks(store),
            },
            {
              path: "add",
              element: <TaskForms />,
              action: MixedAction(store),
            },
            {
              path: "admin",
              element: isAdmin ? <Admin /> : <RedirectToHome />,
            },
            {
              path: "settings",
              element: <Settings />,
              action: updateUserAction(store),
            },
          ],
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      action: loginAction(store),
    },
    {
      path: "/register",
      element: <Register />,
      action: registerAction,
    },
  ]);

  return (
    <RouterProvider router={router}>
      {/* Your route components will be rendered here */}
    </RouterProvider>
  );
};

// Create a component for redirection
const RedirectToHome = () => {
  const navigate = useNavigate();

  // Redirect to the home page ("/") when not authorized
  React.useEffect(() => {
    navigate("/");
  }, []);

  return null; // Return null to prevent rendering content for this case
};

export default App;

