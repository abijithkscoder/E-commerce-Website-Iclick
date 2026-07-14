import { useNavigate } from "react-router-dom";
import "./SecondaryNavbar.css";

function SecondaryNavbar() {
  const navigate = useNavigate();

  const menus = [
    { label: "☰ All", path: "/" },
    { label: "Men", path: "/category/men" },
    { label: "Women", path: "/category/women" },
    { label: "Electronics", path: "/category/1" },
    { label: "Fashion", path: "/category/2" },
    { label: "Home & Living", path: "/category/3" },
    { label: "Beauty", path: "/category/4" },
    { label: "Footwear", path: "/category/5" },
    { label: "Groceries", path: "/category/groceries" },
    { label: "Today's Deals", path: "/category/deals" },
    { label: "New Releases", path: "/category/new" },
    { label: "Best Sellers", path: "/category/best" },
    { label: "Customer Service", path: "/customer-service" },
  ];

  return (
    <div className="secondary-navbar">
      {menus.map((menu, index) => (
        <div
          key={index}
          className="nav-item"
          onClick={() => navigate(menu.path)}
        >
          {menu.label}
        </div>
      ))}
    </div>
  );
}

export default SecondaryNavbar;