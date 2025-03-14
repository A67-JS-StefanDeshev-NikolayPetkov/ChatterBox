//Styles
import "./ChatBody.css";

//Dependency
import { useState } from "react";

//Components
import Message from "../../../../components/message/Message";

function ChatBody({ activeChat }) {
  let lastSender = null;
  const messages = Object.values(activeChat.messages).sort(
    (a, b) => a.timestamp - b.timestamp
  );

  console.log(messages);
  return (
    <div className="chat-body">
      <div className="messages-container">
        {messages.map((message) => {
          console.log(lastSender, message.senderId);
          const isLastSender = lastSender === message.senderId;
          lastSender = message.senderId;
          console.log(isLastSender);

          return (
            <Message
              key={message.timestamp}
              message={message}
              isLastSender={isLastSender}
            ></Message>
          );
        })}
      </div>
    </div>
  );
}

export default ChatBody;
