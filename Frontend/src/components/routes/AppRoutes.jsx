import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import Job from "../pages/Job";

const AppRoutes = () => {
    return (

        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />} >
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/jobs" element={<Job/>}/>
                </Route>
            </Route>

        </Routes>

    )
}

export default AppRoutes