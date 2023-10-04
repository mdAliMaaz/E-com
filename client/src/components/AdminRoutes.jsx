import React from "react";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = ({ component: Component }) => {
  const user = useAuth();
  const admin = useAdmin();

  return user && admin ? <Outlet /> : <Navigate to={"/"} />;
};

export default AdminRoutes;
