import "./ChatWindow.css";

//Components
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";
import AddFriendModal from "../FriendsWindow/AddFriendModal/AddFriendModal";

import { useState, useEffect } from "react";

import { fetchChatData } from "../../../services/teams.service";

function ChatWindow({ chatId }) {
  const [chatData, setChatData] = useState(null);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);

  useEffect(() => {
    if (chatId) {
      fetchChatData(chatId)
        .then((data) => setChatData(data))
        .catch((error) => {
          throw new Error("Error fetching chat data");
        });
    }
  }, [chatId]);

  return (
    <div className="active-chat-window">
      <ChatHeader
        isAddFriendOpen={isAddFriendOpen}
        setIsAddFriendOpen={setIsAddFriendOpen}
        chatData={chatData}
      ></ChatHeader>
      <ChatBody
        isAddFriendOpen={isAddFriendOpen}
        setIsAddFriendOpen={setIsAddFriendOpen}
        messages={chatData ? chatData.messages : []}
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
