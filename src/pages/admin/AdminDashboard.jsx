import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAdminAuth } from "../../context/AdminAuthContext";
import CategoryManager from "../../components/admin/CategoryManager";
import ProductManager from "../../components/admin/ProductManager";
import "./Admin.css";

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [tab, setTab] = useState("products");

  return (
    <main className="admin">
      <Helmet>
        <title>Administration | Maryem Beauty Shop</title>
      </Helmet>

      <header className="admin-header">
        <div className="admin-header__inner container">
          <div className="admin-header__left">
            <span className="admin-header__logo">🌸</span>
            <h1 className="admin-header__title">Maryem Beauty Shop</h1>
          </div>
          <div className="admin-header__right">
            <Link to="/" className="admin-header__link">Voir le site</Link>
            <button className="btn btn-outline admin-header__logout" onClick={logout}>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content container">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${tab === "products" ? "active" : ""}`}
            onClick={() => setTab("products")}
          >
            Produits
          </button>
          <button
            className={`admin-tab ${tab === "categories" ? "active" : ""}`}
            onClick={() => setTab("categories")}
          >
            Catégories
          </button>
        </div>

        {tab === "products" && <ProductManager />}
        {tab === "categories" && <CategoryManager />}
      </div>
    </main>
  );
}
