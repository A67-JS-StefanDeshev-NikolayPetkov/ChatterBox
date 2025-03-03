//Misc imports
import "./Header.css";

//Dependency imports
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <NavLink
        className="logo-container"
        to="/home"
      >
        <div className="logo"></div>
        <p className="logo-text">CHATTERBOX</p>
      </NavLink>

      <nav>
        <NavLink to="/register">register</NavLink>
        <NavLink to="/login">login</NavLink>
        <NavLink to="/about">about</NavLink>
      </nav>
    </div>
  );
}

export default Header;
