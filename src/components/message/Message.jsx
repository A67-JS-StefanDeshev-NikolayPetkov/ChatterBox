import "./Message.css";

//Components
import Avatar from "../avatar/Avatar";

function Message() {
  return (
    <div className="message-container">
      <div className="first-message">
        <div className="photo-container">
          <Avatar type={"user-image"}></Avatar>
        </div>

        <div className="message-right">
          <div className="message-header">
            <p className="sender">message.sender</p>
            <p className="timestamp">message.timestamp</p>
          </div>
          <p className="message-content">message.content</p>
        </div>
      </div>
      <div className="subsequent-messages">
        <div className="subsequent-message">
          <p className="subsequent-timestamp">16:45</p>
          <p className="message-content">message.content</p>
        </div>
        <div className="subsequent-message">
          <p className="subsequent-timestamp">16:46</p>
          <p className="message-content">message.content</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
