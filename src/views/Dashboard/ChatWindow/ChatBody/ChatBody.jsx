//Styles
import "./ChatBody.css";

//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

//Dependency
import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";

//Component
import Avatar from "../../../../components/avatar/Avatar";

//Services
import {
  sendMessage,
  updateChatMessages,
} from "../../../../services/chat.service";

function ChatBody({ chatData, setChatData, receiversData }) {
  const { user, userData } = useContext(AppContext);
  const [currentMessageText, setCurrentMessageText] = useState("");
  const [currentMessageImage, setCurrentMessageImage] = useState(null);
  const { channelId } = useParams();
  const [messages, setMessages] = useState(null);
  const messagesEndRef = useRef(null);
  let lastSender = null;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCurrentMessageImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  //Add on value listener
  useEffect(() => {
    const unsubscribe = updateChatMessages(chatData.uid, setChatData);
    return () => unsubscribe();
  }, [channelId]);

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
              if (lastSender === message[1].sender)
                return (
                  <div
                    className="subsequent-message-container"
                    key={message[0]}
                  >
                    {message[1].text.length > 0 && (
                      <div className="subsequent-message">
                        <span className="subsequent-message-timestamp">
                          {new Date(message[1].createdOn).toLocaleTimeString()}
                        </span>
                        <p>{message[1].text}</p>
                      </div>
                    )}
                    {message[1].image && (
                      <div className="message-image-container">
                        <span className="subsequent-message-timestamp">
                          {console.log(message[1].createdOn)}
                          {new Date(message[1].createdOn).toLocaleTimeString()}
                        </span>
                        <div
                          className="message-image"
                          style={{
                            backgroundImage: `url(${message[1].image})`,
                          }}
                        ></div>
                      </div>
                    )}
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
                    {message[1].text.length > 0 && <p>{message[1].text}</p>}
                    {message[1].image && (
                      <div
                        className="message-image"
                        style={{
                          backgroundImage: `url(${message[1].image})`,
                        }}
                      ></div>
                    )}
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
          if (currentMessageText.trim() === "" && !currentMessageImage) return;
          sendMessage(
            {
              text: currentMessageText,
              sender: user.uid,
              createdOn: Date.now(),
              username: userData.details.username,
              ...(currentMessageImage && { image: currentMessageImage }),
            },
            chatData.uid
          );
          setCurrentMessageText("");
          currentMessageImage && setCurrentMessageImage(null);
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={currentMessageText}
          onChange={(e) => setCurrentMessageText(e.target.value)}
        />
        {currentMessageImage && (
          <div
            className="image-preview"
            style={{ backgroundImage: `url(${currentMessageImage})` }}
          ></div>
        )}
        <FontAwesomeIcon
          icon={faImage}
          className={"icon-btn icon-big"}
          onClick={() => document.getElementById("image-input").click()}
        ></FontAwesomeIcon>
        <input
          type="file"
          id="image-input"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatBody;
