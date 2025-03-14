import "./ChatWindow.css";

//Components
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";

function ChatWindow({ activeChat }) {
  return (
    <div className="active-chat-window">
      <ChatHeader activeChat={activeChat}></ChatHeader>
      <ChatBody activeChat={activeChat}></ChatBody>
    </div>
  );
}

export default ChatWindow;
