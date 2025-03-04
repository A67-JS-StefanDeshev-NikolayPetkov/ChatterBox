//Misc
import "./Logo.css";
import { NavLink } from "react-router-dom";

function LogoWithText() {
  return (
    <NavLink
      className="logo-container"
      to="/home"
    >
      <div className="logo"></div>
    </NavLink>
  );
}

export default LogoWithText;
