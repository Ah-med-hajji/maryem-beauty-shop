import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product);
  };

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__bottom">
          <span className="product-card__price">{product.price.toFixed(3)} DT</span>
          <button className="btn btn-primary product-card__btn" onClick={handleAdd}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </article>
  );
}
