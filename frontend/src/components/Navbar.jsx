import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";


function Navbar({ onLoginClick }) {

  const navigate = useNavigate();

  return (
    <nav className="navbar">

    <div
  className="navbar-logo"
  onClick={() => navigate("/")}
>

  <img
    src={logo}
    alt="iClick Logo"
    className="logo-image"
  />

</div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search products..."
        />
      </div>

      <div className="navbar-actions">

        <button
  className="navbar-btn"
  onClick={() => navigate("/wishlist")}
>
  <FaHeart size={16}/>
  Wishlist
</button>

        <button
          className="navbar-btn"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart size={16} />
          Cart
        </button>

        <button
          className="navbar-btn"
          onClick={onLoginClick}
        >
          <FaUser size={16} />
          Login
        </button>

      </div>

    </nav>
  );
}

export default Navbar;