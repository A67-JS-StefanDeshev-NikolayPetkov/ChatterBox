//Misc
import "./LogoWithText.css";
import { NavLink } from "react-router-dom";

function LogoWithText() {
  return (
    <NavLink
      className="logo-container-text"
      to="/home"
    >
      <div className="logo"></div>
      <p className="logo-text">CHATTERBOX</p>
    </NavLink>
  );
}

export default LogoWithText;
