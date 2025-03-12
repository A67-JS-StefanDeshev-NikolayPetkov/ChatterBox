import "./ChatHeader.css";

//Components
import Avatar from "../../../../components/avatar/Avatar";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function ChatHeader() {
  return (
    <div className="active-chat-header">
      <Avatar
        type={"user-image"}
        status={"online"}
      />
      <div className="active-chat-status">
        <h2 className="active-chat-name">chat.name</h2>
        <span className="active-chat-status">status</span>
      </div>
      <FontAwesomeIcon
        icon={faPlus}
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
      ></FontAwesomeIcon>
    </div>
  );
}

export default ChatHeader;
