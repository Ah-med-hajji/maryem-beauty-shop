import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminGuard({ children }) {
  const { authenticated, checking } = useAdminAuth();
  const location = useLocation();

  if (checking) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#fdf6f0" }}>
        <p style={{ color: "#6b5860", fontFamily: "Nunito, sans-serif" }}>Chargement...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
