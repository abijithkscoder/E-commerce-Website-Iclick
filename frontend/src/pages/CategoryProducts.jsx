import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function CategoryProducts() {

  const { id } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {

      const response = await api.get(`category/${id}/`);

      setProducts(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div
      style={{
        maxWidth: "1400px",
        margin: "40px auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
        gap: "25px",
      }}
    >

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>

  );

}

export default CategoryProducts;