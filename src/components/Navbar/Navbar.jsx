import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
          >
            Analytics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}