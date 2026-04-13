import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main>
      <Helmet>
        <title>Contact | Maryem Beauty Shop</title>
        <meta name="description" content="Contactez Maryem Beauty Shop — WhatsApp, email ou formulaire de contact. Nous sommes à votre écoute." />
      </Helmet>

      <section className="contact-hero">
        <div className="container">
          <h1>Contactez-nous</h1>
          <p>Nous serions ravies de vous entendre</p>
        </div>
      </section>

      <section className="contact-content container">
        <div className="contact-info">
          <div className="contact-info__card">
            <span className="contact-info__icon">📱</span>
            <h3>WhatsApp</h3>
            <a href="https://wa.me/21640599355" target="_blank" rel="noopener noreferrer">
              +216 40 599 355
            </a>
          </div>
          <div className="contact-info__card">
            <span className="contact-info__icon">📧</span>
            <h3>Email</h3>
            <p>contact@maryembeauty.tn</p>
          </div>
          <div className="contact-info__card">
            <span className="contact-info__icon">📍</span>
            <h3>Adresse</h3>
            <p>Kalaa Kebira, Sousse, Tunisie</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Envoyez-nous un message</h2>
          {sent && (
            <div className="contact-form__success">
              Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
            </div>
          )}
          <div className="contact-form__field">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
            />
          </div>
          <div className="contact-form__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Votre message..."
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Envoyer le message</button>
        </form>
      </section>
    </main>
  );
}
