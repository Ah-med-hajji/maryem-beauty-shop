import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { categories } from "../data/products";
import "./Home.css";

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Maryem Beauty Shop — Beauté & Cosmétiques en Tunisie</title>
        <meta name="description" content="Découvrez Maryem Beauty Shop, votre boutique beauté en ligne en Tunisie. Maquillage, soins de la peau, capillaires et parfums livrés chez vous." />
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="hero__overlay"></div>
        <div className="hero__content container">
          <h1 className="hero__title">Révélez votre beauté naturelle</h1>
          <p className="hero__subtitle">
            Découvrez notre sélection de produits beauté premium, soigneusement choisis pour sublimer votre féminité.
          </p>
          <div className="hero__actions">
            <Link to="/categorie/maquillage" className="btn btn-primary">Découvrir nos produits</Link>
            <Link to="/a-propos" className="btn btn-outline">Notre histoire</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories container">
        <h2 className="section-title">Nos Catégories</h2>
        <p className="section-subtitle">Explorez notre gamme de produits beauté soigneusement sélectionnés</p>
        <div className="categories__grid">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/categorie/${cat.id}`} className="category-card">
              <div className="category-card__icon">
                {cat.id === "maquillage" && "💄"}
                {cat.id === "soin-peau" && "✨"}
                {cat.id === "soin-capillaire" && "💇‍♀️"}
                {cat.id === "parfums" && "🌸"}
              </div>
              <h3 className="category-card__name">{cat.name}</h3>
              <p className="category-card__desc">{cat.description}</p>
              <span className="category-card__link">Voir les produits →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="about-teaser">
        <div className="container about-teaser__inner">
          <div className="about-teaser__text">
            <h2>Notre Passion pour la Beauté</h2>
            <p>
              Chez Maryem Beauty Shop, nous croyons que chaque femme mérite de se sentir belle et confiante.
              Notre mission est de vous offrir les meilleurs produits cosmétiques, sélectionnés avec amour et expertise,
              pour révéler votre beauté naturelle au quotidien.
            </p>
            <Link to="/a-propos" className="btn btn-outline">En savoir plus</Link>
          </div>
          <div className="about-teaser__visual">
            <div className="about-teaser__circle"></div>
            <span className="about-teaser__emoji">🌸</span>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner container">
        <div className="promo-banner__inner">
          <h3>Livraison partout en Tunisie</h3>
          <p>Commandez vos produits préférés et recevez-les confortablement chez vous. Paiement à la livraison disponible.</p>
          <Link to="/contact" className="btn btn-primary">Contactez-nous</Link>
        </div>
      </section>
    </main>
  );
}
