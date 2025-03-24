import "./ChatWindow.css";

//Components
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatBody from "./ChatBody/ChatBody";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

import { fetchUsersData } from "../../../services/users.service";

import { fetchChatData } from "../../../services/chat.service";
import Center from "../../../components/center/Center";
import Loader from "../../../components/loader/Loader";

function ChatWindow() {
  const [chatData, setChatData] = useState(null);
  const [receiversData, setReceiversData] = useState(null);
  const { user, userData } = useContext(AppContext);
  const { channelId } = useParams();

  //Fetch chat and members data
  useEffect(() => {
    if (channelId) {
      fetchChatData(channelId)
        .then((data) => {
          data.members = Object.keys(data.members).filter(
            (member) => member !== user.uid
          );
          data.uid = channelId;
          setChatData(data);
          return fetchUsersData(data.members);
        })
        .then((data) => {
          setReceiversData(data);
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    }
  }, [channelId]);

  if (!chatData)
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );

  return (
    <div className="active-chat-window">
      <ChatHeader
        receiversData={
          receiversData
            ? receiversData
            : [user.uid, { status: userData.status }]
        }
      ></ChatHeader>
      <ChatBody
        setChatData={setChatData}
        receiversData={receiversData}
        chatData={chatData}
      ></ChatBody>
    </div>
  );
}

export default ChatWindow;
