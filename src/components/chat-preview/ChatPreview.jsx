//Misc
import "./ChatPreview.css";

//Components
import Avatar from "../avatar/Avatar";

function ChatPreview({ name, imgUrl, status }) {
  return (
    <div className="chat-container">
      <Avatar
        imgUrl={imgUrl}
        type="chat-image"
        status={status}
      ></Avatar>
      <div className="chat-details">
        <div className="chat-name">{name}</div>
        <div className="chat-status">{status}</div>
      </div>
    </div>
  );
}

export default ChatPreview;
