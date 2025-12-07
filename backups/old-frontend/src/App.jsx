import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import DarnaWorkspace from "./pages/darna/DarnaWorkspace";
import TirelireWorkspace from "./pages/tirelire/TirelireWorkspace";
import SsoCallback from "./pages/auth/SsoCallback";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="darna" element={<DarnaWorkspace />} />
        <Route path="tirelire" element={<TirelireWorkspace />} />
        <Route path="sso/callback" element={<SsoCallback />} />
      </Route>
    </Routes>
  );
}

export default App;