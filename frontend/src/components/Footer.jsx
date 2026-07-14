import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import "./Footer.css";
import logo from "../assets/logo.png"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
            <div className="footer-logo">
  <img src={logo} alt="iClick Logo" />
</div>
          <p className="footer-tagline">
            Your one-stop destination for fashion, accessories, and everything in between.
          </p>
          <div className="react-icons">
            <span><FaInstagram /></span>
            <span><FaFacebook /></span>
            <span><FaSquareXTwitter /></span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li>All products</li>
            <li>Best sellers</li>
            <li>New arrivals <span className="footer-badge">New</span></li>
            <li>Sale</li>
            <li>Gift cards</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Accessories</li>
            <li>Shoes</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer care</h3>
          <ul>
            <li>Contact us</li>
            <li>Track order</li>
            <li>Returns & refunds</li>
            <li>Shipping info</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About us</h3>
          <ul>
            <li>Our story</li>
            <li>Careers</li>
            <li>Privacy policy</li>
            <li>Terms & conditions</li>
            <li>Blog</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 iClick. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;