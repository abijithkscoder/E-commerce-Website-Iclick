import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

  const navigate = useNavigate();

  // Replace this with your actual cart state
  const cartItems = [];

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">

        <div className="empty-cart-card">

          <FaShoppingCart className="empty-cart-icon" />

          <h2>Your Cart is Empty</h2>

          <p>
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            className="shop-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Your Cart Items */}
    </div>
  );
}

export default Cart;