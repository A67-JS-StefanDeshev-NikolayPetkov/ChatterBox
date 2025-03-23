import "./ChatWindow.css";

//Components
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppContext";

import { fetchUsersData } from "../../../services/users.service";

import { fetchChatData } from "../../../services/teams.service";
import Center from "../../../components/center/Center";
import Loader from "../../../components/loader/Loader";

function ChatWindow({ chatId }) {
  const [chatData, setChatData] = useState(null);
  const [receiversData, setReceiversData] = useState(null);
  const { user } = useContext(AppContext);

  //Fetch chat and members data
  useEffect(() => {
    if (chatId) {
      fetchChatData(chatId)
        .then((data) => {
          data.members = Object.keys(data.members).filter(
            (member) => member !== user.uid
          );
          data.uid = chatId;
          setChatData(data);
          return fetchUsersData(data.members);
        })
        .then((data) => {
          setReceiversData(data);
        })
<<<<<<< Updated upstream
        .catch((error) => {
          throw new Error(error.message);
=======
           .catch((error) => {
          throw new Error("Error fetching chat data");
>>>>>>> Stashed changes
        });
    }
  }, []);

  if (!chatData || !receiversData)
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );

  return (
    <div className="active-chat-window">
      <ChatHeader receiversData={receiversData}></ChatHeader>
      <ChatBody
        setChatData={setChatData}
        receiversData={receiversData}
        chatData={chatData}
      ></ChatBody>
    </div>
  );
}

export default ChatWindow;
