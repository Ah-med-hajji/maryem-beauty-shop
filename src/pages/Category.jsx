import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getProductsByCategory, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Category.css";

export default function Category() {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <main className="container category-error">
        <h1>Catégorie non trouvée</h1>
        <p>La catégorie que vous recherchez n'existe pas.</p>
      </main>
    );
  }

  return (
    <main>
      <Helmet>
        <title>{category.name} | Maryem Beauty Shop</title>
        <meta name="description" content={category.description} />
      </Helmet>

      <section className="category-hero">
        <div className="container">
          <h1 className="category-hero__title">{category.name}</h1>
          <p className="category-hero__desc">{category.description}</p>
        </div>
      </section>

      <section className="category-products container">
        <div className="category-products__shipping" data-animate>
          🚚 Livraison gratuite à Sousse · 8 DT partout en Tunisie
        </div>
        {products.length > 0 ? (
          <div className="category-products__grid">
            {products.map((product, i) => (
              <div key={product.id} data-animate data-delay={String((i % 4) + 1)}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="category-products__empty">
            Aucun produit disponible dans cette catégorie pour le moment.
          </p>
        )}
      </section>
    </main>
  );
}
