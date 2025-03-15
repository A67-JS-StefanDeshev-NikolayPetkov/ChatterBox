import "./ChatWindow.css";

//Components
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";
import AddFriendModal from "../FriendsWindow/AddFriendModal/AddFriendModal";

import { useState } from "react";

function ChatWindow() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);

  return (
    <div className="active-chat-window">
      <ChatHeader
        isAddFriendOpen={isAddFriendOpen}
        setIsAddFriendOpen={setIsAddFriendOpen}
      ></ChatHeader>
      <ChatBody
        isAddFriendOpen={isAddFriendOpen}
        setIsAddFriendOpen={setIsAddFriendOpen}
      ></ChatBody>
      {isAddFriendOpen && (
        <AddFriendModal
          isAddFriendOpen={isAddFriendOpen}
          setIsAddFriendOpen={setIsAddFriendOpen}
        ></AddFriendModal>
      )}
    </div>
  );
}

export default ChatWindow;
