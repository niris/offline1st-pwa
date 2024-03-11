import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/video">VDO</NavLink>
        <NavLink to="/models">3D</NavLink>
        <NavLink to="/images">Img</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
