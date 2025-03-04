//misc imports
import "./TeamsBar.css";

//Component imports
import Logo from "../../../components/logo/Logo/Logo";

function TeamsBar() {
  return (
    <div className="sidebar">
      <div className="logo-container-sidebar">
        <Logo />
      </div>
      <h2>Teams</h2>
      {/* Add your channels list here */}
    </div>
  );
}

export default TeamsBar;
