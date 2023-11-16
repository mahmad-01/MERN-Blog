import { Routes, BrowserRouter, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Blogs from "../pages/Blogs";
import SignUp from "../pages/SignUp";

const PrivRoutes = () => {
    const { authenticated, setAuthenticated } = useContext(AuthContext);
    if (!authenticated) return <Navigate to='/login' replace />
    return <Outlet />
}

export default function Router() {
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivRoutes />}>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/blogs" element={< Blogs />} />
            </Route>
        </Routes >

    );
}
