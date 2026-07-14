import "./CustomerService.css";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { BsPlayCircle } from "react-icons/bs";
import { MdOutlineShoppingBag, MdOutlineCalendarMonth, MdOutlineAssignmentReturn, MdOutlineSupportAgent } from "react-icons/md";
import bannerImg from "../assets/banner.jpg";

const services = [
  {
    id: 1,
    icon: <MdOutlineShoppingBag size={32} />,
    title: "Browse Products",
    description: "Explore thousands of products across all categories with easy filtering and search.",
    featured: false,
  },
  {
    id: 2,
    icon: <MdOutlineCalendarMonth size={32} />,
    title: "Track My Order",
    description: "Real-time order tracking from purchase to delivery, right at your fingertips.",
    featured: true,
  },
  {
    id: 3,
    icon: <MdOutlineAssignmentReturn size={32} />,
    title: "Easy Returns",
    description: "Hassle-free returns and refunds within 30 days of purchase, no questions asked.",
    featured: false,
  },
  {
    id: 4,
    icon: <MdOutlineSupportAgent size={32} />,
    title: "24/7 Support",
    description: "Our support team is available around the clock to help you with any issues.",
    featured: false,
  },
];

function CustomerService() {
  return (
    <main>

      {/* Hero */}
      <section
        className="cs-hero"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="cs-hero-overlay" />
        <div className="cs-hero-content">
          <h1>Need To Quickly Shop <span className="cs-hero-underline">Online?</span></h1>
          <div className="cs-search-bar">
            <div className="cs-search-left">
              <FiSearch size={18} className="cs-search-icon" />
              <input type="text" placeholder="Search Product or Category" />
            </div>
            <div className="cs-search-divider" />
            <div className="cs-search-right">
              <FiMapPin size={16} className="cs-search-icon" />
              <input type="text" placeholder="Near you or Enter City" />
              <span className="cs-search-arrow">▾</span>
            </div>
            <button className="cs-find-btn">Find</button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="cs-services">
        <div className="cs-container">
          <h2 className="cs-services-title">Our Services</h2>
          <div className="cs-services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className={`cs-service-card ${service.featured ? "featured" : ""}`}
              >
                <div className="cs-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="cs-why">
        <div className="cs-container cs-why-grid">
          <div className="cs-why-text">
            <span className="cs-why-label">Why Choose Us</span>
            <h2>We Made it Shopping Easy for your family</h2>
            <p>
              From browsing to delivery, we ensure a seamless shopping experience.
              Fast shipping, easy returns, and 24/7 support whenever you need it.
              Your satisfaction is our top priority.
            </p>
            <div className="cs-why-actions">
              <button className="cs-btn-primary">Learn More</button>
              <button className="cs-btn-ghost">
                <span className="cs-play-btn"><BsPlayCircle size={18} /></span>
                Watch Video
              </button>
            </div>
          </div>

          <div className="cs-why-image-wrap">
            <div className="cs-why-circle-orange" />
            <div className="cs-why-circle-teal" />
            <div className="cs-why-person" />
            <div className="cs-stat-badge cs-stat-top">
              <strong>600k+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="cs-stat-badge cs-stat-bottom">
              <strong>5600+</strong>
              <span>Products Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="cs-how">
        <div className="cs-container">
          <p className="cs-how-label">How its works</p>
          <h2>Everything you Need we are<br />for Your Assistance</h2>
          <div className="cs-how-bubbles">
            <div className="cs-how-bubble cs-how-bubble-left" />
            <div className="cs-how-bubble cs-how-bubble-right" />
            <div className="cs-how-card">
              <div className="cs-how-card-header">
                <strong>Your Order</strong>
                <span>0.3 KM &nbsp;↗ Track Now</span>
              </div>
              <p className="cs-how-card-time">10:00 AM to 11:00 AM</p>
              <button className="cs-how-confirm-btn">Confirmed</button>
            </div>
            <div className="cs-how-avatar">🛒</div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default CustomerService;