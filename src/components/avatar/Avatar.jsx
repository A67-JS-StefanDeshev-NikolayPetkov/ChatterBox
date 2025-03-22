//Misc imports
import Tooltip from "../tooltip/Tooltip";
import "./Avatar.css";

//Dependency
import { useState, useEffect } from "react";

//Services
import { checkUserStatus } from "../../services/users.service";

/**
 *
 * @param {Object} props component props
 * @param {string} props.imageUrl source of image
 * @param {string} props.type the type of avatar (team, user or chat)
 * @param {function} props.onClick function that handles the on click behavior
 * @param {string} props.status optional: status of user (online, away, buy, offline)
 * @returns
 */
function Avatar({ imageUrl, type, status, name, onClick, uid }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [userStatus, setUserStatus] = useState(status);

  useEffect(() => {
    if (!uid) return;
    const unsubscribe = checkUserStatus(uid, setUserStatus);
    return () => unsubscribe();
  }, []);

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
      <div className="avatar-status">
        {status && <span className={`status-icon ${userStatus}`}></span>}
      </div>
      {type === "team" && (
        <>
          <span style={{ display: isTooltipVisible ? "inline-block" : "none" }}>
            <Tooltip
              text={name ? name : type}
              position="top"
            />
          </span>
        </>
      )}
    </div>
  );
}

export default Avatar;
