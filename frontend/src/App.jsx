import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import KnowYourSoil from "./pages/KnowYourSoil";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import AdminDashboard from "./pages/AdminDashboard";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;
  return children;
}

function UserDashboardRoute() {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  return <Dashboard />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route path="/know-your-soil" element={<KnowYourSoil />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
