//Styles
import "./ChatBody.css";

function ChatBody({ messages }) {
  return (
    <div className="chat-body">
      <div className="messages-container">
        {messages.length > 0
          ? Object.values(messages).map((message) => <p>{message}</p>)
          : ""}
      </div>
    </div>
  );
}

export default ChatBody;
