//misc imports
import "./ChannelsSidebar.css";

//Component imports
import LogoWithText from "../../../components/logo/LogoWithText";

function ChannelsSidebar() {
  return (
    <div className="sidebar">
      <div className="logo-container-sidebar">
        <LogoWithText />
      </div>
      <h2>Channels</h2>
      {/* Add your channels list here */}
    </div>
  );
}

export default ChannelsSidebar;
