import React from "react";
import { Outlet,Navigate } from "react-router-dom";

export default function ProtectedRouter({ children }) {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
