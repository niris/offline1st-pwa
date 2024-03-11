import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/">Offline-1st</NavLink>
        <NavLink to="/video">Videos</NavLink>
        <NavLink to="/models">3D</NavLink>
        <NavLink to="/images">Images</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
