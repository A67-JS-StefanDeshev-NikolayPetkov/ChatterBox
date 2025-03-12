//Styles
import "./ChatBody.css";

//Components
import Message from "../../../../components/message/Message";

function ChatBody() {
  return (
    <div className="chat-body">
      <div className="messages-container">
        <Message></Message>
        <Message></Message>
      </div>
    </div>
  );
}

export default ChatBody;
