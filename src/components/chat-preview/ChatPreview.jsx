//Misc
import "./ChatPreview.css";

//Components
import Avatar from "../avatar/Avatar";

import { useState, useEffect } from "react";

import { subscribeToStatus } from "../../services/users.service";

function ChatPreview({ chat, isActive, setActiveChat }) {
  const [status, setStatus] = useState(chat.status);

  useEffect(() => {
    const unsubscribe = subscribeToStatus(chat.userUid, setStatus);

    return () => {
      unsubscribe();
    };
  }, [status]);

  return (
    <div
      className={`chat-container ${isActive ? "active" : ""}`}
      onClick={setActiveChat}
    >
      <Avatar
        imageUrl={chat.imageUrl}
        type="chat-image"
        status={status}
        userUid={chat.userUid}
      ></Avatar>
      <div className="chat-details">
        <div className="chat-name">{chat.name}</div>
        <div className="chat-status">{status}</div>
      </div>
    </div>
  );
}

export default ChatPreview;
