import "./ChatWindow.css";

//Components
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";

function ChatWindow() {
  return (
    <div className="active-chat-window">
      <ChatHeader></ChatHeader>
      <ChatBody></ChatBody>
    </div>
  );
}

export default ChatWindow;
