import "./ChatHeader.css";

//Components
import Avatar from "../../../../components/avatar/Avatar";

//Dependency

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function ChatHeader({ receiversData }) {
  return (
    <div className="active-chat-header">
      <Avatar
        type={"user-image"}
        status={receiversData[0].status}
      />
      <div className="active-chat-status">
        <h2 className="active-chat-name">{receiversData[0].username}</h2>
        <span className="active-chat-status">{receiversData[0].status}</span>
      </div>
      <FontAwesomeIcon
        icon={faUserPlus}
        className="icon-btn"
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        icon={faPhone}
        className="icon-btn"
      ></FontAwesomeIcon>{" "}
      <FontAwesomeIcon
        icon={faVideo}
        className="icon-btn"
      ></FontAwesomeIcon>{" "}
      <FontAwesomeIcon
        icon={faGear}
        className="icon-btn"
      ></FontAwesomeIcon>{" "}
    </div>
  );
}

export default ChatHeader;
