import { Helmet } from "react-helmet-async";
import "./About.css";

export default function About() {
  return (
    <main>
      <Helmet>
        <title>À Propos | Maryem Beauty Shop</title>
        <meta name="description" content="Découvrez l'histoire de Maryem Beauty Shop, votre boutique beauté en ligne en Tunisie. Qualité, féminité et beauté naturelle." />
      </Helmet>

      <section className="about-hero">
        <div className="container">
          <h1>À Propos de Maryem Beauty Shop</h1>
          <p className="about-hero__tagline">Qualité, féminité, beauté naturelle</p>
        </div>
      </section>

      <section className="about-content container">
        <div className="about-content__section">
          <h2>Notre Histoire</h2>
          <p>
            Maryem Beauty Shop est née d'une passion profonde pour la beauté et le bien-être.
            Fondée en Tunisie, notre boutique en ligne s'est donnée pour mission de rendre accessibles
            les meilleurs produits cosmétiques à toutes les femmes qui souhaitent prendre soin d'elles
            et sublimer leur beauté naturelle.
          </p>
          <p>
            Chaque produit de notre catalogue est soigneusement sélectionné pour sa qualité,
            son efficacité et sa capacité à révéler le meilleur de chaque femme. Nous croyons
            fermement que la beauté est un voyage personnel, et nous sommes honorées de vous
            accompagner dans cette aventure.
          </p>
        </div>

        <div className="about-content__values">
          <h2>Nos Valeurs</h2>
          <div className="about-content__values-grid">
            <div className="value-card">
              <span className="value-card__icon">💎</span>
              <h3>Qualité</h3>
              <p>Nous sélectionnons uniquement des produits de haute qualité, testés et approuvés pour leur efficacité.</p>
            </div>
            <div className="value-card">
              <span className="value-card__icon">🌸</span>
              <h3>Féminité</h3>
              <p>Nos produits célèbrent la femme dans toute sa diversité et sa splendeur.</p>
            </div>
            <div className="value-card">
              <span className="value-card__icon">🌿</span>
              <h3>Beauté Naturelle</h3>
              <p>Nous croyons en une beauté authentique qui respecte et sublime votre nature.</p>
            </div>
          </div>
        </div>

        <div className="about-content__section">
          <h2>Notre Engagement</h2>
          <p>
            Chez Maryem Beauty Shop, votre satisfaction est notre priorité. Nous nous engageons à vous offrir
            un service client attentionné, une livraison rapide partout en Tunisie, et des produits qui
            répondent à vos attentes. Votre confiance est notre plus belle récompense.
          </p>
        </div>
      </section>
    </main>
  );
}
