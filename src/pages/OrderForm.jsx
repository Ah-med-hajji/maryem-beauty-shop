import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";
import "./OrderForm.css";

export default function OrderForm() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      "🌸 *Nouvelle Commande — Maryem Beauty Shop* 🌸",
      "",
      `👤 *Nom:* ${form.name}`,
      `📞 *Téléphone:* ${form.phone}`,
      `📍 *Adresse:* ${form.address}`,
      "",
      "🛍️ *Produits commandés:*",
    ];

    items.forEach((item) => {
      lines.push(`- ${item.name} x${item.quantity} — ${(item.price * item.quantity).toFixed(3)} DT`);
    });

    lines.push("");
    lines.push(`💰 *Total: ${totalPrice.toFixed(3)} DT*`);
    lines.push("");
    lines.push("Merci de confirmer la commande dès que possible. ✨");

    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = buildWhatsAppMessage();
    clearCart();
    window.open(`https://wa.me/21640599355?text=${message}`, "_blank");
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <main className="container order-empty">
        <Helmet>
          <title>Commander | Maryem Beauty Shop</title>
        </Helmet>
        <h1>Votre panier est vide</h1>
        <p>Ajoutez des produits à votre panier avant de commander.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>
      </main>
    );
  }

  return (
    <main>
      <Helmet>
        <title>Commander | Maryem Beauty Shop</title>
        <meta name="description" content="Confirmez votre commande Maryem Beauty Shop — livraison partout en Tunisie." />
      </Helmet>

      <section className="order-hero">
        <div className="container">
          <h1>Confirmer votre commande</h1>
          <p>Renseignez vos informations pour finaliser la commande via WhatsApp</p>
        </div>
      </section>

      <section className="order-content container">
        <form className="order-form" onSubmit={handleSubmit}>
          <h2>Vos informations</h2>
          <div className="order-form__field">
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom complet"
              required
            />
          </div>
          <div className="order-form__field">
            <label htmlFor="phone">Numéro de téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+216 XX XXX XXX"
              required
            />
          </div>
          <div className="order-form__field">
            <label htmlFor="address">Adresse de livraison</label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Votre adresse complète"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="order-summary">
            <h2>Résumé de la commande</h2>
            <div className="order-summary__items">
              {items.map((item) => (
                <div key={item.id} className="order-summary__item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>x{item.quantity} — {(item.price * item.quantity).toFixed(3)} DT</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-summary__total">
              <span>Total</span>
              <span>{totalPrice.toFixed(3)} DT</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary order-submit">
            Confirmer via WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
}
