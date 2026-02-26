import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ theme, onToggleTheme }) {
  const navbarCollapseRef = useRef(null);

  const navLinkClass = ({ isActive }) =>
    `nav-link${isActive ? ' active fw-semibold' : ''}`;

  const navbarThemeClass = theme === 'dark'
    ? 'navbar-dark bg-dark'
    : 'navbar-light bg-light';

  const handleNavLinkClick = () => {
    // Close the navbar collapse when a link is clicked
    if (navbarCollapseRef.current) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapseRef.current, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg border-bottom ${navbarThemeClass}`}>
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Live API App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar" ref={navbarCollapseRef}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass} onClick={handleNavLinkClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={navLinkClass} onClick={handleNavLinkClick}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={navLinkClass} onClick={handleNavLinkClick}>
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={navLinkClass} onClick={handleNavLinkClick}>
                Products
              </NavLink>
            </li>
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onToggleTheme}>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;