//Misc imports
import "./ChannelBalloon.css";

//Dependency imports
import { useState } from "react";

//Component imports
import Tooltip from "../../../components/tooltip/Tooltip";
function ChannelBalloon({ channelName, imageUrl, onClick, title }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className="channel-balloon"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={imageUrl} alt={channelName} className="channel-image" />
      <Tooltip
        text={title}
        position="top"
        style={{ display: isTooltipVisible ? "inline-block" : "none" }}
      />
    </div>
  );
}

export default ChannelBalloon;
