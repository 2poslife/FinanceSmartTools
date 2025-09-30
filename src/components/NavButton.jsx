import { useNavigate, useLocation } from "react-router-dom";

const NavButton = ({ path, label, Icon }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // Scroll immediately
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Force navigation even if same route
    if (location.pathname === path) {
      // trick: add a dummy state to force re-render
      navigate(path, { state: { scroll: Date.now() } });
    } else {
      navigate(path);
    }
  };

  const isActive = location.pathname === path ? "active" : "";

  return (
    <button onClick={handleClick} className={`nav-btn ${isActive}`}>
      <Icon className="icon" />
      <span>{label}</span>
    </button>
  );
};

export default NavButton;
