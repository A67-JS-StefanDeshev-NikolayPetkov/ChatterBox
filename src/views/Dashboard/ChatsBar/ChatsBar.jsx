//Misc imports
import "./ChatsBar.css";
import plusSign from "../../../assets/plus.svg";
import chatLogo from "../../../assets/default-chat.png";

//Dependency imports
import { useNavigate, useParams } from "react-router-dom";

//Component imports
import UserHeader from "./UserHeader/UserHeader";
import ChatPreview from "../../../components/chat-preview/ChatPreview";
import Avatar from "../../../components/avatar/Avatar";

function ChatsBar({ channels, activeChannelId }) {
  const navigate = useNavigate();
  const { team } = useParams();

  return (
    <div className="chats-bar">
      <UserHeader></UserHeader>
      <div className="search-bar"></div>
      <div className={`chats-container`}>
        {channels.map((chat) => (
          <ChatPreview
            key={chat.id}
            chat={{
              name: chat.name,
              imageUrl: chat.imageUrl || chatLogo,
            }}
            isActive={chat.id === activeChannelId}
            setActiveChat={() => navigate(`/${team}/${chat.id}`)}
          />
        ))}
        <div className="add-team">
          <Avatar
            onClick={() => navigate(`/${team}/create-chat`)}
            type="team"
            imageUrl={plusSign}
            name="Create Channel"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatsBar;
