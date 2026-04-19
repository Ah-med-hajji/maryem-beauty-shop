import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useData } from "../context/DataContext";
import "./Home.css";

const categoryIcons = {
  maquillage: "💄",
  "soin-peau": "✨",
  "soin-capillaire": "💇‍♀️",
  parfums: "🌸",
  lingerie: "🩱",
};

export default function Home() {
  const { categories, loading, refetch } = useData();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <main>
      <Helmet>
        <title>Maryem Beauty Shop — Beauté & Cosmétiques en Tunisie</title>
        <meta name="description" content="Découvrez Maryem Beauty Shop, votre boutique beauté en ligne en Tunisie. Maquillage, soins de la peau, capillaires et parfums livrés chez vous." />
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="hero__overlay"></div>
        <div className="hero__particles">
          <span className="hero__particle">✨</span>
          <span className="hero__particle">🌸</span>
          <span className="hero__particle">💕</span>
          <span className="hero__particle">✨</span>
          <span className="hero__particle">🌸</span>
        </div>
        <div className="hero__content container">
          <h1 className="hero__title">Révélez votre beauté naturelle</h1>
          <p className="hero__subtitle">
            Découvrez notre sélection de produits beauté premium, soigneusement choisis pour sublimer votre féminité.
          </p>
          <div className="hero__actions">
            <Link to="/categorie/maquillage" className="btn btn-primary">Découvrir nos produits</Link>
            <Link to="/a-propos" className="btn btn-outline">Notre histoire</Link>
          </div>
          <div className="hero__badge">
            🚚 Livraison gratuite à Sousse · 8 DT partout en Tunisie
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories container">
        <h2 className="section-title" data-animate>Nos Produits</h2>
        <p className="section-subtitle" data-animate data-delay="1">
          Explorez notre gamme de produits beauté soigneusement sélectionnés
        </p>
        {loading ? (
          <p style={{ textAlign: "center", color: "var(--text-light)" }}>Chargement...</p>
        ) : (
          <div className="categories__grid">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/categorie/${cat.id}`}
                className="category-card"
                data-animate
                data-delay={String(i + 1)}
              >
                <div className="category-card__icon">{categoryIcons[cat.id] || "✨"}</div>
                <h3 className="category-card__name">{cat.name}</h3>
                <p className="category-card__desc">{cat.description}</p>
                <span className="category-card__link">Voir les produits →</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* About teaser */}
      <section className="about-teaser">
        <div className="container about-teaser__inner">
          <div className="about-teaser__text" data-animate="fade-left">
            <h2>Notre Passion pour la Beauté</h2>
            <p>
              Chez Maryem Beauty Shop, nous croyons que chaque femme mérite de se sentir belle et confiante.
              Notre mission est de vous offrir les meilleurs produits cosmétiques, sélectionnés avec amour et expertise,
              pour révéler votre beauté naturelle au quotidien.
            </p>
            <Link to="/a-propos" className="btn btn-outline">En savoir plus</Link>
          </div>
          <div className="about-teaser__visual" data-animate="fade-right" data-delay="2">
            <div className="about-teaser__circle"></div>
            <span className="about-teaser__emoji">🌸</span>
          </div>
        </div>
      </section>

      {/* Shipping promo */}
      <section className="shipping-section container" data-animate="scale">
        <div className="shipping-section__inner">
          <div className="shipping-section__cards">
            <div className="shipping-section__card">
              <span className="shipping-section__icon">🚚</span>
              <h3>Livraison à Sousse</h3>
              <p className="shipping-section__price">Gratuite</p>
            </div>
            <div className="shipping-section__card">
              <span className="shipping-section__icon">📦</span>
              <h3>Livraison partout en Tunisie</h3>
              <p className="shipping-section__price">8 DT</p>
            </div>
            <div className="shipping-section__card">
              <span className="shipping-section__icon">📍</span>
              <h3>Basée à</h3>
              <p className="shipping-section__price">Kalaa Kebira, Sousse</p>
            </div>
          </div>
          <Link to="/contact" className="btn btn-primary shipping-section__btn">
            Commander maintenant
          </Link>
        </div>
      </section>
    </main>
  );
}
