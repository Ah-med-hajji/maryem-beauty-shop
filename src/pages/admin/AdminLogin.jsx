import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAdminAuth } from "../../context/AdminAuthContext";
import "./Admin.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(password);
    setLoading(false);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <main className="admin-login">
      <Helmet>
        <title>Connexion Admin | Maryem Beauty Shop</title>
      </Helmet>
      <div className="admin-login__card">
        <div className="admin-login__logo">🌸</div>
        <h1 className="admin-login__title">Maryem Beauty Shop</h1>
        <p className="admin-login__subtitle">Panneau d'administration</p>
        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe"
              required
              autoFocus
            />
          </div>
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="btn btn-primary admin-login__btn" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <a href="/" className="admin-login__back">← Retour au site</a>
      </div>
    </main>
  );
}
