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

  useEffect(() => {
    console.log("Chat ID:", chatId);
    if (chatId) {
      fetchChatData(chatId)
        .then((data) => {
          //transform object of members into array of members and remove logged in user
          data.members = Object.keys(data.members).filter(
            (member) => member !== user.uid
          );

          setChatData(data);
          return fetchUsersData(data.members);
        })
        .then((data) => {
          setReceiversData(data);
        })
        .catch((error) => {
          throw new Error("Error fetching chat data");
        });
    }
  }, [chatId]);

  useEffect(() => console.log(receiversData), [receiversData]);

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
        receiversData={receiversData}
        messages={chatData.messages ? chatData.messages : []}
      ></ChatBody>
    </div>
  );
}

export default ChatWindow;
