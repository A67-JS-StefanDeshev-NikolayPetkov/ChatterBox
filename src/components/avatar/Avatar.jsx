//Misc imports
import "./Avatar.css";

import { useState } from "react";

/**
 *
 * @param {Object} props component props
 * @param {string} props.imageUrl source of image
 * @param {string} props.type the type of avatar e.g. team, user or chat
 * @param {function} props.onClick function that handles the on click behavior
 * @param {string} props.status optional: status of user (online, away, dont-disturb, offline)
 * @returns
 */
function Avatar({ imageUrl, type, status, teamName, onClick }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className={`avatar-container ${`${type}-container`}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="avatar"
        className={`avatar ${`${type}-image`}`}
      />
      {status && <span className={`status-icon ${status}`}></span>}
      {type === "team" && (
        <span
          className="tooltip"
          style={{ display: isTooltipVisible ? "inline-block" : "none" }}
        >
          {teamName ? teamName : type}
        </span>
      )}
    </div>
  );
}

export default Avatar;
