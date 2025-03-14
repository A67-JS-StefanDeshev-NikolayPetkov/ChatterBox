//Misc imports
import "./ChatsBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

//Dependency imports
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { updateUserStatus } from "../../../services/users.service";

//Components imports
import StatusDropdown from "../../../components/status-dropdown/StatusDropdown";
import Avatar from "../../../components/avatar/Avatar";
import ChatPreview from "../../../components/chat-preview/ChatPreview";

function ChatsBar() {
  const { user, userData, onLogout } = useContext(AppContext);
  const [chats, setChats] = useState([
    { id: "sadf3", name: "MelonMan", imageUrl: null, status: "online" },
    { id: "sadf4", name: "Pesho0o0o", imageUrl: null, status: "away" },
    { id: "sadf5", name: "Pistaka", imageUrl: null, status: "dont-disturb" },
  ]);
  const [status, setStatus] = useState(userData.status);

  useEffect(() => {
    updateUserStatus(user.uid, status)
      .then(() => {
        userData.status = status;
      })
      .catch((e) => {
        console.error(e);
      });
  }, [status]);

  const navigate = useNavigate();

  const handleStatus = (option) => setStatus(option);

  const handleLogout = () => {
    onLogout();
    navigate("/home");
  };

  return (
    <div className="chats-bar">
      <div className="logged-user-container">
        <div className="user-details">
          <Avatar
            className="user-image"
            status={status}
            type={"user"}
            imageUrl={null}
          ></Avatar>
          <div className="user-status">
            <p className="username">{userData.username}</p>
            <StatusDropdown
              handleStatus={handleStatus}
              status={status}
            ></StatusDropdown>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="icon-btn"
          onClick={handleLogout}
        ></FontAwesomeIcon>
      </div>
      <div className="chats-container">
        {chats.length >= 0 &&
          chats.map((chat) => (
            <ChatPreview
              key={chat.id}
              imageUrl={chat.imageUrl}
              name={chat.name}
              status={chat.status}
            ></ChatPreview>
          ))}
      </div>
    </div>
  );
}

export default ChatsBar;
