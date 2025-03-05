//Misc imports
import "./ChannelBalloon.css";

//Dependency imports
import { useState } from "react";

//Component imports
import Tooltip from "../../../components/tooltip/Tooltip";
function ChannelBalloon({ channelName, imageUrl, onClick, title }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="channel-balloon"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // style={{ position: "relative", display: "inline-block" }}
    >
      <img src={imageUrl} alt={channelName} className="channel-image" />
      {isHovered && <Tooltip text={title} position="top" />}
    </div>
  );
}

export default ChannelBalloon;
