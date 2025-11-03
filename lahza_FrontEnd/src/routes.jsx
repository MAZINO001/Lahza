// /* eslint-disable no-unused-vars */
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import Layout from "./pages/Layout";
// import NotFound from "./pages/NotFound ";

// import QuoteDetails from "./pages/client/QuoteDetails";
// import Quotes from "./pages/client/Quotes";
// import Projects from "./pages/client/Projects";
// import Invoices from "./pages/client/Invoices";
// import Profile from "./pages/client/Profile";
// import Settings from "./pages/client/Settings";
// import Tickets from "./pages/client/Tickets";
// import Payments from "./pages/client/Payments";
// import Offers from "./pages/client/Offers";
// import ProjectDetails from "./pages/client/ProjectDetails";
// import Dashboard_Comp from "./Components/Dashboard_Comp";
// import Clients from "./pages/client/clients";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import ConfirmPassword from "./pages/Auth/ConfirmPassword";
// import ResetPassword from "./pages/Auth/ResetPassword";

// // const loggedUser = {
// //   name: "Monir Dev",
// //   email: "monir@example.com",
// //   role: "client",
// // };

// // if (!localStorage.getItem("user")) {
// //   localStorage.setItem("user", JSON.stringify(loggedUser));
// // }

// const user = JSON.parse(localStorage.getItem("user"));
// const currentRole = user.role;
// function isAuthenticated() {
//   return !!user;
// }

// function ProtectedRoute({ children }) {
//   return isAuthenticated() ? children : <Navigate to="/auth/login" replace />;
// }

// export default function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/auth" element={<Layout />}>
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="confirmPassword" element={<ConfirmPassword />} />
//           <Route path="forgotPassword" element={<ForgotPassword />} />
//           <Route path="resetPassword" element={<ResetPassword />} />
//         </Route>

//         <Route
//           path="/client"
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >
//           <Route
//             path="dashboard"
//             element={<Dashboard_Comp currentRole={currentRole} />}
//           />
//           <Route
//             path="profile"
//             element={<Profile />}
//             currentRole={currentRole}
//           />
//           <Route
//             path="settings"
//             element={<Settings />}
//             currentRole={currentRole}
//           />
//           <Route
//             path="projects"
//             element={<Projects currentRole={currentRole} />}
//           />
//           <Route
//             path="projects/:id"
//             element={<ProjectDetails />}
//             currentRole={currentRole}
//           />
//           <Route path="quotes" element={<Quotes />} currentRole={currentRole} />
//           <Route
//             path="quotes/:id"
//             element={<QuoteDetails />}
//             currentRole={currentRole}
//           />
//           <Route
//             path="tickets"
//             element={<Tickets />}
//             currentRole={currentRole}
//           />
//           <Route
//             path="invoices"
//             element={<Invoices />}
//             currentRole={currentRole}
//           />
//           <Route
//             path="payments"
//             element={<Payments />}
//             currentRole={currentRole}
//           />
//           <Route path="offers" element={<Offers />} currentRole={currentRole} />
//           <Route path="clients" element={<Clients />} />
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ConfirmPassword from "./pages/Auth/ConfirmPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import NotFound from "./pages/NotFound ";

import QuoteDetails from "./pages/client/QuoteDetails";
import Quotes from "./pages/client/Quotes";
import Projects from "./pages/client/Projects";
import Invoices from "./pages/client/Invoices";
import Profile from "./pages/client/Profile";
import Settings from "./pages/client/Settings";
import Tickets from "./pages/client/Tickets";
import Payments from "./pages/client/Payments";
import Offers from "./pages/client/Offers";
import ProjectDetails from "./pages/client/ProjectDetails";
import Clients from "./pages/client/clients";
import AuthLayout from "./pages/AuthLayout";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/client/Dashboard";

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
