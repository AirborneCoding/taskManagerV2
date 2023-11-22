import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedAuth({ children }) {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    return <>{children} </>;

}
