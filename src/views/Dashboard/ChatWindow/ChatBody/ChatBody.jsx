//Styles
import "./ChatBody.css";

import { useEffect, useState, useContext, useRef } from "react";

import {
  sendMessage,
  updateChatMessages,
} from "../../../../services/chat.service";
import { AppContext } from "../../../../context/AppContext";

function ChatBody({ chatData, setChatData }) {
  const { user, userData } = useContext(AppContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    updateChatMessages(chatData.uid, setChatData);
  }, []);

  useEffect(() => {
    setMessages(
      chatData?.messages
        ? Object.entries(chatData.messages).sort(
            (a, b) => a.createdOn - b.createdOn
          )
        : null
    );
  }, [chatData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-body">
      <div className="messages-container">
        {messages
          ? Object.values(messages).map((message) => (
              <div key={message[0]}>
                <p>sender: {message[1].username}</p>
                <p>{message[1].text}</p>
              </div>
            ))
          : ""}
        <div ref={messagesEndRef}></div>
      </div>
      <form
        className="chat-input-container"
        onSubmit={(е) => {
          е.preventDefault();
          setCurrentMessage("");
          sendMessage(
            {
              text: currentMessage,
              sender: user.uid,
              createdOn: Date.now(),
              username: userData.details.username,
            },
            chatData.uid
          );
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatBody;
