import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ConfirmPassword from "./pages/Auth/ConfirmPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import NotFound from "./pages/extras/NotFound ";

import QuoteDetails from "./pages/quotes/QuoteDetails";
import Quotes from "./pages/quotes/Quotes";
import Projects from "./pages/projects/Projects";
import Invoices from "./pages/invoices/Invoices";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/settings/Settings";
import Tickets from "./pages/Tickets/Tickets";
import Payments from "./pages/Payments/Payments";
import Offers from "./pages/Offers/Offers";
import ProjectDetails from "./pages/projects/ProjectDetails";
import Clients from "./pages/clients/Clients";
import AuthLayout from "./pages/layouts/AuthLayout";
import AppLayout from "./pages/layouts/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";

// Get user and role

const user = JSON.parse(localStorage.getItem("user"));
const currentRole = user?.role;

function isAuthenticated() {
  return !!user;
}

function ProtectedRoute({ children, allowedRoles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    return <Navigate to={`/${currentRole}/dashboard`} replace />;
  }

  return children;
}

// Define route configurations with permissions
const routePermissions = {
  dashboard: ["admin", "team_member", "client"],
  profile: ["admin", "team_member", "client"],
  settings: ["admin", "team_member", "client"],
  projects: ["admin", "client"],
  quotes: ["admin", "client"],
  tickets: ["admin", "team_member", "client"],
  invoices: ["admin", "client"],
  payments: ["admin", "client"],
  offers: ["admin", "client"],
  clients: ["admin", "client"],
};

export default function AppRoutes() {
  // Determine the base path based on role
  const basePath = currentRole || "client";

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
            isAuthenticated() ? (
              <Navigate to={`/${basePath}/dashboard`} replace />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />

        {["admin", "team_member", "client"].map((role) => (
          <Route
            key={role}
            path={`/${role}`}
            element={
              <ProtectedRoute allowedRoles={[role]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={routePermissions.dashboard}>
                  <Dashboard currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={routePermissions.profile}>
                  <Profile currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="settings"
              element={
                <ProtectedRoute allowedRoles={routePermissions.settings}>
                  <Settings currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="projects"
              element={
                <ProtectedRoute allowedRoles={routePermissions.projects}>
                  <Projects currentRole={currentRole} />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects/:id"
              element={
                <ProtectedRoute allowedRoles={routePermissions.projects}>
                  <ProjectDetails currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="quotes"
              element={
                <ProtectedRoute allowedRoles={routePermissions.quotes}>
                  <Quotes currentRole={currentRole} />
                </ProtectedRoute>
              }
            />
            <Route
              path="quotes/:id"
              element={
                <ProtectedRoute allowedRoles={routePermissions.quotes}>
                  <QuoteDetails currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="tickets"
              element={
                <ProtectedRoute allowedRoles={routePermissions.tickets}>
                  <Tickets currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="invoices"
              element={
                <ProtectedRoute allowedRoles={routePermissions.invoices}>
                  <Invoices currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="payments"
              element={
                <ProtectedRoute allowedRoles={routePermissions.payments}>
                  <Payments currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="offers"
              element={
                <ProtectedRoute allowedRoles={routePermissions.offers}>
                  <Offers currentRole={currentRole} />
                </ProtectedRoute>
              }
            />

            <Route
              path="clients"
              element={
                <ProtectedRoute allowedRoles={routePermissions.clients}>
                  <Clients currentRole={currentRole} />
                </ProtectedRoute>
              }
            />
          </Route>
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
