import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./MobileCartBar.css";

export default function MobileCartBar({ onCartClick }) {
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();

  // Hide on order page and home page
  if (location.pathname === "/commander" || totalItems === 0) return null;

  return (
    <div className="mobile-cart-bar" onClick={onCartClick}>
      <div className="mobile-cart-bar__left">
        <span className="mobile-cart-bar__badge">{totalItems}</span>
        <span className="mobile-cart-bar__text">
          {totalItems} article{totalItems > 1 ? "s" : ""}
        </span>
      </div>
      <div className="mobile-cart-bar__right">
        <span className="mobile-cart-bar__price">{totalPrice.toFixed(3)} DT</span>
        <span className="mobile-cart-bar__cta">Voir le panier</span>
      </div>
    </div>
  );
}
