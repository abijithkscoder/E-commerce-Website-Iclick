import "./Categories.css";
import { useNavigate } from "react-router-dom";

import electronics from "../assets/categories/electronics.jpg";
import fashion from "../assets/categories/fashion.jpg";
import homeLiving from "../assets/categories/home-living.jpg";
import beauty from "../assets/categories/beauty.jpg";
import footwear from "../assets/categories/footwear.jpg";

const categories = [
  { id: 1, name: "Electronics", image: electronics },
  { id: 2, name: "Fashion", image: fashion },
  { id: 3, name: "Home & Living", image: homeLiving },
  { id: 4, name: "Beauty", image: beauty },
  { id: 5, name: "Footwear", image: footwear },
];

function Categories() {
  const navigate = useNavigate();

  return (
    <section className="category-section">
      <h2 className="category-title">SHOP BY CATEGORY</h2>

      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
