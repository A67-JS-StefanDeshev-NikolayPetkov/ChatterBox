//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

//Dependency
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

//Services
import {
  fetchUsersData,
  removeFromFriends,
} from "../../services/users.service";

import { checkIfDmsExist, startDms } from "../../services/chat.service";

//Components
import FriendPreview from "../friend-preview/FriendPreview";

//CSS
import "./AllFriends.css";

//Component
function AllFriends({ filtered, onStartAudioCall, onStartVideoCall }) {
  const navigate = useNavigate();
  const { user, userData, setContext, updateUserData } = useContext(AppContext);
  const [friendsData, setFriendsData] = useState(null);

  async function handleOpenChat(receiverUid) {
    let chatId;
    if (userData.chats)
      chatId = await checkIfDmsExist(userData.chats, receiverUid);
    if (!chatId) chatId = await startDms(user.uid, receiverUid);

    updateUserData();
    navigate(`/${user.uid}/${chatId}`);
  }

  function handleRemoveFromFriends(senderUid, receiverUid) {
    //rework friendsData to be an object at some point
    removeFromFriends(senderUid, receiverUid);
    const newFriendsData = friendsData.filter((el) => el.uid !== receiverUid);
    setContext((prev) => {
      delete prev.userData.friends[receiverUid];
      return { ...prev };
    });
    setFriendsData(newFriendsData);
  }

  useEffect(() => {
    if (userData?.friends) {
      fetchUsersData(Object.keys(userData.friends)).then((data) =>
        setFriendsData(data)
      );
    }
  }, [userData]);

  if (!friendsData || friendsData.length < 1)
    return (
      <div className="all-friends-container center-flexbox">
        <div className="flex-column center-flexbox">
          <p>ZzZzZz...</p>
          <p> Add a friend and say hello:</p>
          <FontAwesomeIcon
            icon={faPlusSquare}
            className="icon-btn icon-big"
            onClick={() => {
              navigate(`/${user.uid}/friends/add`);
            }}
          />
        </div>
      </div>
    );

  if (filtered) {
    const onlineFriends = friendsData.filter((friend) => {
      return friend.status === "online";
    });

    return onlineFriends.length > 0 ? (
      <div className="all-friends-container">
        {onlineFriends.map((friend) => (
          <FriendPreview
            key={friend.uid}
            friend={friend}
            senderUid={user.uid}
            handleRemoveFromFriends={handleRemoveFromFriends}
            handleOpenChat={handleOpenChat}
          ></FriendPreview>
        ))}
      </div>
    ) : (
      <p>ZzZzZ... nobody is online</p>
    );
  }

  return (
    <div className="all-friends-container">
      {friendsData.map((friend) => (
        <FriendPreview
          key={friend.uid}
          friend={friend}
          senderUid={user.uid}
          onStartAudioCall={() => onStartAudioCall(friend.uid)}
          onStartVideoCall={() => onStartVideoCall(friend.uid)}
          handleRemoveFromFriends={handleRemoveFromFriends}
          handleOpenChat={handleOpenChat}
        ></FriendPreview>
      ))}
    </div>
  );
}

export default AllFriends;
