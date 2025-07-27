import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./views/login/login.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./views/login/secure/dashboard.tsx";
import Cookies from "js-cookie";
import { AppContext } from "./context.tsx";
import { OrderHistory } from "./views/login/secure/orderHistory.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppContext.Provider
      value={{ accessToken: Cookies.get("access_token") || "" }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/last-purchases" element={<OrderHistory />} />
      </Routes>
    </AppContext.Provider>
  </BrowserRouter>
);
