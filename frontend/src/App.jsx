import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import BannerCarousel from "./components/BannerCarousel";
import Categories from "./components/Categories";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SecondaryNavbar from "./components/SecondaryNavbar";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CustomerService from "./pages/CustomerService";

function App() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <LoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <Navbar onLoginClick={() => setShowModal(true)} />
      <SecondaryNavbar />

      {location.pathname === "/" && (
        <>
          <BannerCarousel />
          <Categories />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/customer-service" element={<CustomerService />} />
      </Routes>
    </>
  );
}

export default App;