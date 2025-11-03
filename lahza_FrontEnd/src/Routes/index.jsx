import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ConfirmPassword from "../pages/Auth/ConfirmPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

import NotFound from "../pages/NotFound ";
import Dashboard from "../pages/client/Dashboard";
import Profile from "../pages/client/Profile";
import Settings from "../pages/client/Settings";
import Projects from "../pages/client/Projects";
import ProjectDetails from "../pages/client/ProjectDetails";
import Quotes from "../pages/client/Quotes";
import QuoteDetails from "../pages/client/QuoteDetails";
import Tickets from "../pages/client/Tickets";
import Invoices from "../pages/client/Invoices";
import Payments from "../pages/client/Payments";
import Offers from "../pages/client/Offers";
import Clients from "../pages/client/clients";

import AuthLayout from "../pages/AuthLayout";
import AppLayout from "../pages/AppLayout";

import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

export default function AppRoutes() {
  const { role, user } = useAuth();
  const basePath = role || "client";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirmPassword" element={<ConfirmPassword />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
        </Route>

        <Route
          path="/"
          element={
            user ? (
              <Navigate to={`/${basePath}/dashboard`} replace />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "team_member", "client"]} />
          }
        >
          <Route path="/:role" element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="quotes/:id" element={<QuoteDetails />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="payments" element={<Payments />} />
            <Route path="offers" element={<Offers />} />
            <Route path="clients" element={<Clients />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
