// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
