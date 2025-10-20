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
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* routes with auth middleware */}
          <Route element={<ProtectedRoutes />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

// Hello everyone I'm Shem Regidro the team lead software developer
// and project manager of Kabankalan City Emergency Response App or KCera

export default App;
