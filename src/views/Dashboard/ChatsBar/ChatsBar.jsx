//Misc imports
import "./ChatsBar.css";
import plusSign from "../../../assets/plus.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import chatLogo from "../../../assets/default-chat.png";

//Dependency imports
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

//Services
import {
  getChatsDetails,
  subscribeToChats,
} from "../../../services/chat.service";

import { getUserDetailsByUid } from "../../../services/users.service";

//Component imports
import UserHeader from "./UserHeader/UserHeader";
import ChatPreview from "../../../components/chat-preview/ChatPreview";
import Avatar from "../../../components/avatar/Avatar";

function ChatsBar() {
  const [chats, setChats] = useState(null);
  const { user, userData } = useContext(AppContext);
  const { teamId, chatId } = useParams();
  const navigate = useNavigate();
  const isUser = teamId === user.uid;

  const handleFetchChats = async function () {
    //If we are in the users dms, return if no chats available
    if (isUser && !userData?.chats) {
      setChats(null);
      return;
    }

    //Get all chats details
    let chatsDetails = await getChatsDetails(teamId, isUser);

    if (isUser) {
      //Update chat details
      const updatedChatsDetails = await Promise.all(
        chatsDetails.map(async (chat) => {
          //Get receiver uid
          const receiver = Object.keys(chat.members).filter(
            (member) => member !== user.uid
          );
          //Get receivers data
          const receiverData = (await getUserDetailsByUid(receiver[0])).val();
          //return chat data with name equaling receivers name
          return {
            ...chat,
            name: receiverData.username,
            imageUrl: receiverData.profilePicture,
            status: receiverData.status,
            userUid: receiver[0],
          };
        })
      );

      setChats(updatedChatsDetails);

      return;
    }

    setChats(chatsDetails);
  };

  useEffect(() => {
    const unsubscribe = subscribeToChats(teamId, isUser, handleFetchChats);

    if (isUser && !userData?.chats) {
      setChats(null);
      return;
    }

    return () => {
      unsubscribe();
    };
  }, [teamId]);

  return (
    <div className="chats-bar">
      <UserHeader></UserHeader>
      <div className="search-bar"></div>
      <div className={`chats-container`}>
        {chats &&
          chats.map((chat) => {
            return (
              <ChatPreview
                key={chat.id}
                chat={{
                  name: chat.name,
                  imageUrl: chat.imageUrl || chatLogo,
                  status: chat?.status,
                  userUid: chat?.userUid,
                }}
                isActive={chat.id === chatId}
                setActiveChat={() => navigate(`/${teamId}/${chat.id}`)}
              />
            );
          })}
      </div>
      {!isUser && (
        <div className="chatbar-btns">
          <FontAwesomeIcon
            onClick={() => navigate(`/${teamId}/add-members`)}
            icon={faUserPlus}
            className="add-members-btn"
          />
          <Avatar
            onClick={() => navigate(`/${teamId}/create-chat`)}
            type="team"
            imageUrl={plusSign}
            name="Create Channel"
          />
        </div>
      )}
    </div>
  );
}

export default ChatsBar;

// //If in dms, fetch all receivers data for dm chats and store in the chat object
// if (isUser)
//   chatsDetails.forEach(async (chat) => {
//     if (chat.type === "dm")
//       chat.receiverDetails = (await getChatMembersDetails(chat.id)).filter(
//         (member) => member.id !== user.uid
//       )[0];
//     console.log(await getChatMembersDetails(chat.id));
//     console.log(chatsDetails);
//     return chat;
//   });

// const handleDmsClick = async () => {
//   if (userData?.chats && Object.keys(userData.chats).length < 1)
//     navigate("/home");
//   const chatsData = await getChatsDetails(user.uid, true);
//   setChats(chatsData);
//   navigate(`/${user.uid}/${chatsData[0].id}`);
// };
