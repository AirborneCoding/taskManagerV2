import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

import {
    Login,
    Register,
    HomeLayout,
    Landing,
    NotFoundError,
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

import ProtectedRoute from "./protectedRoutes.jsx";
import ProtectedAuth from "./ProtectedAuth.jsx";

const router = createBrowserRouter([
    // *************AUTH*****************
    {
        path: "/login",
        element: <ProtectedAuth><Login /></ProtectedAuth>,
        action: loginAction(store),
    },
    {
        path: "/register",
        element: <ProtectedAuth><Register /></ProtectedAuth>,
        action: registerAction,
    },
    // *************CONTENT*****************
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
                element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
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
                        element: <Admin />,
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
            {
                path: "/*",
                element: <About />,
            },
        ],
    },
])


const AppV2 = () => {
    return <RouterProvider router={router} />
};

export default AppV2;
