import { useState, useEffect } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import LoginModal from "../components/LoginModal";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true);
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <section className="products-section">
        <h2>Featured Products</h2>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;