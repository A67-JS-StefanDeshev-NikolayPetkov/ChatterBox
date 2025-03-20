import "./FriendsWindow.css";

//Components
import FriendsHeader from "./FriendsHeader/FriendsHeader";
import FriendsBody from "./FriendsBody/FriendsBody";

import { useState, useContext } from "react";
import {
  cancelFriendRequest,
  acceptFriendRequest,
} from "../../../services/users.service";
import { AppContext } from "../../../context/AppContext";

function FriendsWindow() {
  const [openWindow, setOpenWindow] = useState("all");
  const { setContext } = useContext(AppContext);

  async function handleCancelFriendRequest(
    userUid,
    foundUserUid,
    setAddButton
  ) {
    cancelFriendRequest(userUid, foundUserUid);
    setContext((prevState) => {
      const updatedState = { ...prevState };

      delete updatedState.userData.friendRequests.sent[foundUserUid];
      return { ...updatedState };
    });
    if (setAddButton) setAddButton(true);
  }

  async function handleAcceptFriendRequest(foundUserUid, userUid) {
    acceptFriendRequest(foundUserUid, userUid);
    setContext((prevState) => {
      const updatedState = { ...prevState };
      if (!updatedState.userData.friends) updatedState.userData.friends = {};

      updatedState.userData.friends[foundUserUid] = true;
      return { ...updatedState };
    });
  }

  return (
    <div className="friends-window">
      <FriendsHeader setOpenWindow={setOpenWindow}></FriendsHeader>
      <FriendsBody
        setOpenWindow={setOpenWindow}
        openWindow={openWindow}
        handleCancelFriendRequest={handleCancelFriendRequest}
        handleAcceptFriendRequest={handleAcceptFriendRequest}
      ></FriendsBody>
    </div>
  );
}

export default FriendsWindow;
