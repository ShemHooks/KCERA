import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./utils/loader";

const Registration = lazy(() => import("./pages/errors/Registration"));
const Login = lazy(() => import("./auth/Login"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const NotAdmin = lazy(() => import("./pages/errors/NotAdmin"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/not/admin" element={<NotAdmin />} />

          {/* routes with auth middleware */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
