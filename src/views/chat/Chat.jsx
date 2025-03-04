//Misc imports
import "./Chat.css";

//Component imports
import TeamsBar from "./TeamsBar/TeamsBar";
import ChatsBar from "./ChatsBar/ChatsBar";
import ChatWindow from "./ChatWindow/ChatWindow";
import Loader from "../../components/loader/Loader";

//Dependency
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  if (!userData) return <Loader></Loader>;

  return (
    <div className="chat-container">
      <TeamsBar />
      <ChatsBar />
      <ChatWindow />
    </div>
  );
}

export default Chat;
