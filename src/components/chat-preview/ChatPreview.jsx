//Misc
import "./ChatPreview.css";

//Components
import Avatar from "../avatar/Avatar";

import { useEffect } from "react";

function ChatPreview({ chat, isActive , setActiveChat }) {
  useEffect(() => {
  }, [chat]);
  return (
    <div
      className={`chat-container ${isActive ? "active" : ""}`}
      onClick={setActiveChat}
    >
      <Avatar
        imageUrl={chat.imageUrl}
        type="chat-image"
        status={chat.status}
      ></Avatar>
      <div className="chat-details">
        <div className="chat-name">{chat.name}</div>
        <div className="chat-status">{chat.status}</div>
      </div>
    </div>
  );
}

export default ChatPreview;
