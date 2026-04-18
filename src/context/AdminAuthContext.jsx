import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

// SHA-256 of "mariem123"
const ADMIN_PASSWORD_HASH =
  "8aa19fc38a1015afaace22d68873bfa542263cafddeb25be2fd414f89cdec969";

const SESSION_KEY = "maryem-admin-auth";

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function AdminAuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const login = async (password) => {
    const hash = await sha256(password);
    if (hash === ADMIN_PASSWORD_HASH) {
      setAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ authenticated, checking, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
