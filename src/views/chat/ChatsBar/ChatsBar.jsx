//Misc imports
import "./ChatsBar.css";

//Dependency imports
import { useState } from "react";
import UserHeader from "./UserHeader/UserHeader";
import ChatPreview from "../../../components/chat-preview/ChatPreview";

function ChatsBar({ users, chats, setActiveChat }) {
  const [friendsWindow, setFriendsWindow] = useState(false);

  return (
    <div className="chats-bar">
      <UserHeader setFriendsWindow={setFriendsWindow}></UserHeader>
      <div className="search-bar"></div>
      <div className="chats-container">
        {!friendsWindow &&
          chats.length >= 0 &&
          chats.map((chat) => (
            <ChatPreview
              key={chat.id}
              chat={chat}
              setActiveChat={setActiveChat}
            ></ChatPreview>
          ))}
        {friendsWindow &&
          users.length >= 0 &&
          users.map((user) => (
            <ChatPreview
              key={user.id}
              chat={user}
              setActiveChat={setActiveChat}
            ></ChatPreview>
          ))}
      </div>
    </div>
  );
}

export default ChatsBar;
