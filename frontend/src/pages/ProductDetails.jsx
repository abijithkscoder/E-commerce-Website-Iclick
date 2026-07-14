import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiShoppingCart, FiMapPin, FiTruck, FiCheck } from "react-icons/fi";
import { BsCashCoin, BsCreditCard, BsBank } from "react-icons/bs";
import api from "../services/api";
import "./ProductDetails.css";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api/").replace(/\/api\/?$/, "");

function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return BASE_URL + (path.startsWith("/") ? path : "/" + path);
}

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
const AVAILABLE_PINS = ["682019","682020","682021","682022","682023","110001","400001","560001","700001","600001"];

const OFFERS = [
  { icon: <BsCashCoin />, title: "Cashback", desc: "Up to ₹57 via Amazon Pay" },
  { icon: <BsCreditCard />, title: "No cost EMI", desc: "₹49.78 savings on ICICI Pay" },
  { icon: <BsBank />, title: "Bank offer", desc: "Up to ₹2,500 on credit cards" },
];

const PERKS = ["Pay on delivery", "10-day returns", "Secure checkout", "Top brand"];

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [hoverStar, setHoverStar] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [toast, setToast] = useState("");

  const [qty, setQty] = useState(1);
  const [cartStatus, setCartStatus] = useState("idle");

  const [showPinInput, setShowPinInput] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pinResult, setPinResult] = useState(null);

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`products/${id}/`);
      setProduct(res.data);
      const first = res.data.images?.length > 0
        ? res.data.images[0].image
        : res.data.image;
      setSelectedImage(first);
    } catch (err) {
      console.error(err);
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRate = (val) => {
    setUserRating(val);
    setToast("Thanks for rating " + val + " ★");
    setTimeout(() => setToast(""), 2000);
  };

  const addToCart = async () => {
    setCartStatus("adding");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartStatus("error");
        alert("Please log in to add items to your cart.");
        return;
      }
      await api.post(
        "cart/add/",
        { product_id: product.id, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartStatus("added");
      setTimeout(() => setCartStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      setCartStatus("error");
      setTimeout(() => setCartStatus("idle"), 2000);
    }
  };

  const checkDelivery = () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setPinResult({ ok: false, msg: "Enter a valid 6-digit pincode" });
      return;
    }
    if (AVAILABLE_PINS.includes(pincode)) {
      setPinResult({ ok: true, msg: "Delivery available to " + pincode });
    } else {
      setPinResult({ ok: false, msg: "Sorry, not deliverable to " + pincode });
    }
  };

  const cartLabel = { idle: "Add to cart", adding: "Adding…", added: "Added ✓", error: "Try again" }[cartStatus];
  const activeStar = hoverStar || userRating;
  const images = product?.images?.length > 0 ? product.images : null;
  const mainImgUrl = getImageUrl(selectedImage);

  if (loading) return (
    <div className="pd-state">
      <div className="pd-spinner" />
      <p>Loading…</p>
    </div>
  );

  if (error) return (
    <div className="pd-state pd-state--error">
      <p>{error}</p>
      <button className="pd-retry-btn" onClick={fetchProduct}>Retry</button>
    </div>
  );

  return (
    <div className="pd-wrapper">

      {/* LEFT — Gallery */}
      <div className="pd-left">
        <div className="pd-main-image">
          {mainImgUrl && !imgError ? (
            <img src={mainImgUrl} alt={product.name} onError={() => setImgError(true)} />
          ) : (
            <div className="pd-img-fallback">No image</div>
          )}
        </div>
        <div className="pd-thumbnails">
          {images ? images.map((img) => (
            <img
              key={img.id}
              src={getImageUrl(img.image)}
              alt=""
              className={`pd-thumb ${selectedImage === img.image ? "pd-thumb--active" : ""}`}
              onClick={() => { setSelectedImage(img.image); setImgError(false); }}
              onError={(e) => { e.target.style.opacity = "0.3"; }}
            />
          )) : (
            <img
              src={getImageUrl(product.image)}
              alt=""
              className="pd-thumb pd-thumb--active"
              onError={(e) => { e.target.style.opacity = "0.3"; }}
            />
          )}
        </div>
      </div>

      {/* RIGHT — Info */}
      <div className="pd-right">

        {/* Brand + Name */}
        {product.category && <div className="pd-brand">{product.category}</div>}
        <h1 className="pd-name">{product.name}</h1>

        {/* Star rating */}
        <div className="pd-rating-row">
          <div className="pd-stars">
            {[1,2,3,4,5].map((v) => (
              <span
                key={v}
                className={`pd-star ${activeStar >= v ? "filled" : ""}`}
                onMouseEnter={() => setHoverStar(v)}
                onMouseLeave={() => setHoverStar(0)}
                onClick={() => handleRate(v)}
                aria-label={`${v} star`}
              >★</span>
            ))}
          </div>
          <span className="pd-rating-label">
            {userRating ? `${RATING_LABELS[userRating]} (${userRating}/5)` : "Tap to rate"}
          </span>
          {toast && <div className="pd-toast">{toast}</div>}
        </div>

        <hr className="pd-rule" />

        {/* Price */}
        <div className="pd-price-row">
          <span className="pd-price">₹{Number(product.price).toLocaleString("en-IN")}</span>
          {product.original_price && (
            <>
              <span className="pd-mrp">₹{Number(product.original_price).toLocaleString("en-IN")}</span>
              <span className="pd-discount">
                {Math.round((1 - product.price / product.original_price) * 100)}% off
              </span>
            </>
          )}
        </div>
        <div className="pd-emi">EMI from ₹67/mo · <a href="#">No cost EMI available</a></div>

        {/* Stock */}
        {product.stock > 0
          ? <span className="pd-badge pd-badge--in">In stock — {product.stock} left</span>
          : <span className="pd-badge pd-badge--out">Out of stock</span>
        }

        {product.description && <p className="pd-description">{product.description}</p>}

        <hr className="pd-rule" />

        {/* Quantity */}
        <div>
          <div className="pd-label">Quantity</div>
          <div className="pd-qty-row">
            <button className="pd-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="pd-qty-val">{qty}</span>
            <button className="pd-qty-btn" onClick={() => setQty(q => Math.min(product.stock || 10, q + 1))}>+</button>
          </div>
        </div>

        {/* Delivery */}
        <div className="pd-delivery-box">
          <div className="pd-label" style={{ marginBottom: 0 }}>Delivery</div>
          <div className="pd-delivery-row">
            <FiMapPin className="pd-dicon green" />
            <div>
              <div className="pd-dtext"><strong>Kochi, Kerala 682019</strong></div>
              <span className="pd-status ok">Delivery available</span>
            </div>
          </div>
          <div className="pd-delivery-row">
            <FiTruck className="pd-dicon accent" />
            <div className="pd-dtext">
              <strong>Free delivery</strong> by Sunday, 28 June<br />
              Or fastest by Tomorrow, 27 June
            </div>
          </div>
          <div className="pd-delivery-change">
            <span>Want to check another location?</span>
            <button onClick={() => { setShowPinInput(p => !p); setPinResult(null); }}>Change</button>
          </div>
          {showPinInput && (
            <div className="pd-pin-input">
              <input
                type="text"
                placeholder="Enter pincode"
                maxLength={6}
                value={pincode}
                onChange={e => { setPincode(e.target.value); setPinResult(null); }}
              />
              <button onClick={checkDelivery}>Check</button>
            </div>
          )}
          {pinResult && (
            <span className={`pd-status ${pinResult.ok ? "ok" : "no"}`}>{pinResult.msg}</span>
          )}
        </div>

        {/* Offers */}
        <div>
          <div className="pd-label">Offers</div>
          <div className="pd-offers">
            {OFFERS.map((o, i) => (
              <div key={i} className="pd-offer-card">
                <span className="pd-offer-icon">{o.icon}</span>
                <div className="pd-offer-title">{o.title}</div>
                <div className="pd-offer-desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div className="pd-perks">
          {PERKS.map((p, i) => (
            <div key={i} className="pd-perk">
              <FiCheck className="pd-perk-icon" />{p}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pd-actions">
          <button
            className={`pd-btn pd-btn--cart${cartStatus === "added" ? " pd-btn--added" : ""}`}
            onClick={addToCart}
            disabled={cartStatus === "adding" || product.stock === 0}
          >
            <FiShoppingCart /> {cartLabel}
          </button>
          <button className="pd-btn pd-btn--buy">Buy now</button>
        </div>

      </div>
    </div>
  );
}
