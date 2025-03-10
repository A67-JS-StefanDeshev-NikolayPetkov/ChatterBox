//Misc imports
import "./ChatsBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

//Dependency imports
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

//Components imports
import Dropdown from "../../../components/dropdown/Dropdown";
import Avatar from "../../../components/avatar/Avatar";
import ChatPreview from "../../../components/chat-preview/ChatPreview";

function ChatsBar() {
  const { onLogout, userData } = useContext(AppContext);
  const [chats, setChats] = useState([
    { id: "sadf3", name: "MelonMan", imageUrl: "", status: "online" },
    { id: "sadf4", name: "Pesho0o0o", imageUrl: "", status: "away" },
    { id: "sadf5", name: "Pistaka", imageUrl: "", status: "dont-disturb" },
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  //Change imageUrl to userData.img once implemented !!!
  return (
    <div className="chats-bar">
      <div className="logged-user-container">
        <div className="user-details">
          <Avatar
            className="user-image"
            status={"online"}
            type={"user"}
            imageUrl={""}
          ></Avatar>
          <div className="user-status">
            <p className="username">{userData.username}</p>
            <Dropdown
              options={["online", "away", "dont-disturb", "offline"]}
              userData={userData}
            ></Dropdown>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="settings-btn"
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
