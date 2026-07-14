import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {

  const navigate = useNavigate();

  // Replace with your actual wishlist data later
  const wishlistItems = [];

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-wishlist">

        <div className="wishlist-card">

          <FaHeart className="wishlist-icon"/>

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save your favourite products here.
          </p>

          <button
            onClick={() => navigate("/")}
            className="shop-btn"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  return (

    <div className="wishlist-page">

      <h1>My Wishlist</h1>

      {wishlistItems.map(item => (

        <div
          className="wishlist-item"
          key={item.id}
        >

          <img
            src={item.image}
            alt={item.name}
          />

          <div className="wishlist-info">

            <h3>{item.name}</h3>

            <p>₹ {item.price}</p>

          </div>

          <button className="cart-btn">
            Add To Cart
          </button>

          <button className="remove-btn">
            Remove
          </button>

        </div>

      ))}

    </div>

  );

}

export default Wishlist;
