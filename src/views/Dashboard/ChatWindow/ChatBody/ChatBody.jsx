//Styles
import "./ChatBody.css";

import { useEffect, useState, useContext, useRef } from "react";

import Avatar from "../../../../components/avatar/Avatar";

import {
  sendMessage,
  updateChatMessages,
} from "../../../../services/chat.service";
import { AppContext } from "../../../../context/AppContext";

function ChatBody({ chatData, setChatData, receiversData }) {
  const { user, userData } = useContext(AppContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const messagesEndRef = useRef(null);
  let lastSender = null;

  //Add on value listener
  useEffect(() => {
    updateChatMessages(chatData.uid, setChatData);
  }, []);

  //On chatData change get messages and sort them
  useEffect(() => {
    setMessages(
      chatData?.messages
        ? Object.entries(chatData.messages).sort(
            (a, b) => a.createdOn - b.createdOn
          )
        : null
    );
  }, [chatData]);

  //On messages change scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-body">
      <div className="messages-container">
        {messages
          ? Object.values(messages).map((message) => {
              //Render messages differently depending on if the previous message was sent by the same user
              //Render this if its a subsequent message
              console.log(receiversData);
              if (lastSender === message[1].sender)
                return (
                  <div
                    className="subsequent-message-container"
                    key={message[0]}
                  >
                    <p className="subsequent-message">
                      <span className="subsequent-message-timestamp">
                        {new Date(message[1].createdOn).toLocaleTimeString()}
                      </span>
                      {message[1].text}
                    </p>
                  </div>
                );

              lastSender = message[1].sender;

              //Render this if its the first message
              return (
                <div
                  className="first-message-container"
                  key={message[0]}
                >
                  <div className="sender-avatar-container">
                    <Avatar></Avatar>
                  </div>
                  <div>
                    <p className="first-message">
                      {message[1].username}
                      <span className="first-message-timestamp">
                        {new Date(message[1].createdOn).toLocaleString()}
                      </span>
                    </p>
                    <p>{message[1].text}</p>
                  </div>
                </div>
              );
            })
          : ""}
        <div ref={messagesEndRef}></div>
      </div>
      <form
        className="chat-input-container"
        onSubmit={(е) => {
          е.preventDefault();
          if (currentMessage.trim() === "") return;
          sendMessage(
            {
              text: currentMessage,
              sender: user.uid,
              createdOn: Date.now(),
              username: userData.details.username,
            },
            chatData.uid
          );
          setCurrentMessage("");
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
