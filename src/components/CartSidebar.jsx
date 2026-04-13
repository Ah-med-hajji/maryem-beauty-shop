import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartSidebar.css";

export default function CartSidebar({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    navigate("/commander");
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--open" : ""}`}
        onClick={onClose}
      />
      <aside className={`cart-sidebar ${isOpen ? "cart-sidebar--open" : ""}`}>
        <div className="cart-sidebar__header">
          <h2>Mon Panier ({totalItems})</h2>
          <button onClick={onClose} className="cart-sidebar__close" aria-label="Fermer le panier">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-sidebar__empty">
            <p>Votre panier est vide</p>
            <button className="btn btn-outline" onClick={onClose}>Continuer mes achats</button>
          </div>
        ) : (
          <>
            <div className="cart-sidebar__items">
              {items.map((item) => (
                <div key={item.id} className="cart-sidebar__item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-sidebar__item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-sidebar__item-price">{item.price.toFixed(3)} DT</p>
                    <div className="cart-sidebar__qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Diminuer">−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Augmenter">+</button>
                    </div>
                  </div>
                  <button className="cart-sidebar__remove" onClick={() => removeItem(item.id)} aria-label="Supprimer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-sidebar__footer">
              <div className="cart-sidebar__shipping-note">
                🚚 Livraison gratuite à Sousse · 8 DT partout en Tunisie
              </div>
              <div className="cart-sidebar__total">
                <span>Total</span>
                <span>{totalPrice.toFixed(3)} DT</span>
              </div>
              <button className="btn btn-primary cart-sidebar__confirm" onClick={handleConfirm}>
                Confirmer la commande
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
