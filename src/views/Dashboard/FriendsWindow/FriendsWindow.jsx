import "./FriendsWindow.css";

//Components
import FriendsHeader from "./FriendsHeader/FriendsHeader";
import FriendsBody from "./FriendsBody/FriendsBody";

import { useContext } from "react";
import {
  cancelFriendRequest,
  acceptFriendRequest,
} from "../../../services/users.service";
import { AppContext } from "../../../context/AppContext";

function FriendsWindow() {
  const { updateUserData } = useContext(AppContext);
  async function handleCancelFriendRequest(
    userUid,
    foundUserUid,
    setAddButton
  ) {
    cancelFriendRequest(userUid, foundUserUid);
    updateUserData();
    if (setAddButton) setAddButton(true);
  }

  async function handleAcceptFriendRequest(foundUserUid, userUid) {
    acceptFriendRequest(foundUserUid, userUid);
    updateUserData();
  }

  return (
    <div className="friends-window">
      <FriendsHeader></FriendsHeader>
      <FriendsBody
        handleCancelFriendRequest={handleCancelFriendRequest}
        handleAcceptFriendRequest={handleAcceptFriendRequest}
      ></FriendsBody>
    </div>
  );
}

export default FriendsWindow;
