//Misc
import "./ChatPreview.css";

//Components
import Avatar from "../avatar/Avatar";

function ChatPreview({ chat, setActiveChat }) {
  return (
    <div
      className="chat-container"
      onClick={() => setActiveChat(chat)}
    >
      <Avatar
        imgUrl={chat.imgUrl}
        type="chat-image"
        status={chat.status}
      ></Avatar>
      <div className="chat-details">
        <div className="chat-name">{chat.name}</div>
        <div className="chat-status">{chat.status}</div>
      </div>
    </div>
  );
}

export default ChatPreview;
