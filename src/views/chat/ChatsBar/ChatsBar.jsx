//Misc imports
import "./ChatsBar.css";

//Dependency imports
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

//Components imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../../components/avatar/Avatar";

function ChatsBar() {
  const { onLogout, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="chats-bar">
      <div className="logged-user-container">
        <div className="user-details">
          <div className="user-image"></div>
          <div className="user-status">
            <p className="username">{userData.username}</p>
            <p className="status">Online</p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="settings-btn"
          onClick={handleLogout}
        ></FontAwesomeIcon>
      </div>
      <div className="chats-container">
        <div className="chat-container">
          <Avatar
            type="chat-image"
            status="online"
          ></Avatar>
          <div className="chat-name">Pesho</div>
        </div>
        <div className="chat-container"></div>
      </div>
    </div>
  );
}

export default ChatsBar;
