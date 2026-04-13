import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <h3 className="footer__logo">🌸 Maryem Beauty Shop</h3>
          <p className="footer__tagline">Révélez votre beauté naturelle</p>
          <p className="footer__location">📍 Kalaa Kebira, Sousse, Tunisie</p>
          <p className="footer__shipping">🚚 Livraison gratuite à Sousse · 8 DT partout en Tunisie</p>
        </div>

        <div className="footer__links">
          <h4>Liens Rapides</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/categorie/maquillage">Maquillage</Link></li>
            <li><Link to="/categorie/soin-peau">Soin de la Peau</Link></li>
            <li><Link to="/categorie/soin-capillaire">Soin Capillaire</Link></li>
            <li><Link to="/categorie/parfums">Parfums</Link></li>
            <li><Link to="/categorie/lingerie">Lingerie</Link></li>
            <li><Link to="/a-propos">À Propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Contact</h4>
          <a
            href="https://wa.me/21640599355"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__whatsapp"
          >
            WhatsApp: +216 40 599 355
          </a>
          <p>contact@maryembeauty.tn</p>
          <p>Kalaa Kebira, Sousse, Tunisie</p>
        </div>

        <div className="footer__social">
          <h4>Suivez-nous</h4>
          <div className="footer__social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575472260312" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; 2026 Maryem Beauty Shop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
