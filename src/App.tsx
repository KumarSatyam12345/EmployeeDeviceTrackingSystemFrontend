import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NewUserLogin from "./components/NewUserLogin";
import Dashboard from "./components/DashBoard";
import Employees from "./components/Employees";
import Devices from "./components/Devices";
import ProtectedRoute from "./components/ProtectedRoute";
import { DeviceProvider } from "./components/DeviceProvider";
import Layout from "./components/Layout";

const App = () => {
  return (
    <DeviceProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<NewUserLogin />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/devices"
              element={
                <Layout>
                  <Devices />
                </Layout>
              }
            />
            <Route
              path="/employees"
              element={
                <Layout>
                  <Employees />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </Router>
    </DeviceProvider>
  );
};

export default App;
