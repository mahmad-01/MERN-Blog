import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import LoginHome from "../pages/LoginHome";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Blogs from "../pages/Blogs";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";

const PrivRoutes = () => {
    const { authenticated } = useContext(AuthContext);
    if (!authenticated) return <Navigate to='/login' replace />
    return <Outlet />
}

export default function Router() {
    return (
        <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivRoutes />}>
                <Route path="/home" element={<LoginHome />}></Route>
                <Route path="/blogs" element={< Blogs />} />
            </Route>
        </Routes >

    );
}
