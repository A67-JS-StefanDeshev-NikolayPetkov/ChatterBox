//Misc imports
import "./Chat.css";

//Component imports
import ChannelsSidebar from "../../views/chat/channelsSidebar/ChannelsSidebar";
import UserInfoSidebar from "../../views/chat/userInfoSidebar/UserInfoSidebar";
import ChatWindow from "../../views/chat/chatWindow/ChatWindow";

function Chat() {
  return (
    <div className="chat-container">
      <ChannelsSidebar />
      <UserInfoSidebar />
      <ChatWindow />
    </div>
  );
}

export default Chat;
