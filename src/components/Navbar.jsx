import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
import "./Navbar.css";

export default function Navbar({ onCartClick }) {
  const { totalItems } = useCart();
  const { categories, getProductsByCategory } = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);
  const dropdownTimeout = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setExpandedCat(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  const toggleCategory = (catId) => {
    setExpandedCat(expandedCat === catId ? null : catId);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      {/* Top info bar */}
      <div className="navbar__topbar">
        <div className="container navbar__topbar-inner">
          <span className="navbar__topbar-item">
            📍 Kalaa Kebira, Sousse
          </span>
          <a href="https://wa.me/21640599355" className="navbar__topbar-item navbar__topbar-phone">
            📞 +216 40 599 355
          </a>
          <span className="navbar__topbar-item navbar__topbar-shipping">
            🚚 Livraison gratuite à Sousse · 8 DT partout en Tunisie
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-icon">🌸</span>
          <span className="navbar__logo-text">Maryem Beauty Shop</span>
        </Link>

        <button
          className={`navbar__hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <li><NavLink to="/" end onClick={closeMenu}>Accueil</NavLink></li>

          {/* Produits dropdown */}
          <li
            className="navbar__dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`navbar__dropdown-trigger ${dropdownOpen ? "active" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Produits
              <svg className="navbar__dropdown-arrow" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 4l3 3 3-3" />
              </svg>
            </button>

            {/* Desktop mega menu */}
            <div className={`navbar__mega ${dropdownOpen ? "navbar__mega--open" : ""}`}>
              {categories.map((cat) => (
                <div key={cat.id} className="navbar__mega-cat">
                  <Link to={`/categorie/${cat.id}`} className="navbar__mega-cat-title" onClick={closeMenu}>
                    <span className="navbar__mega-icon">{cat.icon || "✨"}</span>
                    {cat.name}
                  </Link>
                  <ul className="navbar__mega-products">
                    {getProductsByCategory(cat.id).map((product) => (
                      <li key={product.id}>
                        <Link to={`/categorie/${cat.id}`} onClick={closeMenu}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile accordion */}
            <div className="navbar__mobile-cats">
              {categories.map((cat) => (
                <div key={cat.id} className="navbar__mobile-cat">
                  <button className="navbar__mobile-cat-btn" onClick={() => toggleCategory(cat.id)}>
                    <span>{cat.icon || "✨"} {cat.name}</span>
                    <svg
                      className={`navbar__mobile-chevron ${expandedCat === cat.id ? "open" : ""}`}
                      width="14" height="14" viewBox="0 0 14 14"
                      fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M3 5l4 4 4-4" />
                    </svg>
                  </button>
                  {expandedCat === cat.id && (
                    <div className="navbar__mobile-prods">
                      {getProductsByCategory(cat.id).map((product) => (
                        <Link key={product.id} to={`/categorie/${cat.id}`} onClick={closeMenu}>
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </li>

          <li><NavLink to="/a-propos" onClick={closeMenu}>À Propos</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
        </ul>

        <button
          className="navbar__cart"
          onClick={() => { onCartClick(); closeMenu(); }}
          aria-label="Panier"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && (
            <span className="navbar__cart-badge navbar__cart-badge--bounce">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
