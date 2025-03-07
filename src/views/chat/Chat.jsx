//Misc imports
import "./Chat.css";

//Component imports
import TeamsBar from "./TeamsBar/TeamsBar";
import ChatsBar from "./ChatsBar/ChatsBar";
import ChatWindow from "./ChatWindow/ChatWindow";
import Loader from "../../components/loader/Loader";
import Center from "../../components/center/Center";

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

  if (!userData)
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );

  return (
    <div className="app-container">
      <TeamsBar />
      <ChatsBar />
      <ChatWindow />
    </div>
  );
}

export default Chat;
