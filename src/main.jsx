import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AdminAuthProvider>
        <DataProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </DataProvider>
      </AdminAuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
