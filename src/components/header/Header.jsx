//Misc imports
import "./Header.css";

//Dependency imports
import { NavLink } from "react-router-dom";

//Component
import LogoWithText from "../logo/LogoWithText/LogoWithText";

function Header() {
  return (
    <div className="header">
      <LogoWithText></LogoWithText>

      <nav>
        <NavLink to="/register">register</NavLink>
        <NavLink to="/login">login</NavLink>
        <NavLink to="/about">about</NavLink>
      </nav>
    </div>
  );
}

export default Header;
