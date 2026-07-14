import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card__image"
        onClick={() => navigate(`/product/${product.id}`)}
        onError={(e) => { e.target.src = "/placeholder.png"; }}
      />
      <h3>{product.name}</h3>
      <p>₹ {product.price.toLocaleString("en-IN")}</p>
    </div>
  );
}

export default ProductCard;