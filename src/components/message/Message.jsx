import "./Message.css";

//Components
import Avatar from "../avatar/Avatar";

function Message({ message, isLastSender }) {
  if (isLastSender) {
    return (
      <div className="subsequent-messages">
        <div className="subsequent-message">
          <p className="subsequent-timestamp">
            {new Date(message.timestamp).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="message-content">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-container">
      <div className="first-message">
        <div className="photo-container">
          <Avatar type={"user-image"}></Avatar>
        </div>

        <div className="message-right">
          <div className="message-header">
            <p className="sender">{message.senderId}</p>
            <p className="timestamp">
              {new Date(message.timestamp).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <p className="message-content">{message.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
