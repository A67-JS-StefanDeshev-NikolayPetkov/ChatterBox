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

  //If no user, go to home page
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  //Once we get the userData, go to updated route
  useEffect(() => {
    if (userData) {
      navigate(
        `/dashboard/${userData.username}${
          userData.chats ? userData.chats[0] : ""
        }`
      );
    }
  }, [userData]);

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
