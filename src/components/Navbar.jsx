import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar({ onCartClick }) {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-icon">🌸</span>
          <span className="navbar__logo-text">Maryem Beauty Shop</span>
        </Link>

        <button
          className={`navbar__hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu de navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <li><NavLink to="/" onClick={closeMenu}>Accueil</NavLink></li>
          <li><NavLink to="/categorie/maquillage" onClick={closeMenu}>Maquillage</NavLink></li>
          <li><NavLink to="/categorie/soin-peau" onClick={closeMenu}>Soin de la Peau</NavLink></li>
          <li><NavLink to="/categorie/soin-capillaire" onClick={closeMenu}>Soin Capillaire</NavLink></li>
          <li><NavLink to="/categorie/parfums" onClick={closeMenu}>Parfums</NavLink></li>
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
          {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
        </button>
      </nav>
    </header>
  );
}
