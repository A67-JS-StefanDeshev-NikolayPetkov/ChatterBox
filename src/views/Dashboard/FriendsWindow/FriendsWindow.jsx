import "./FriendsWindow.css";

//Components
import FriendsHeader from "./FriendsHeader/FriendsHeader";
import FriendsBody from "./FriendsBody/FriendsBody";
import CallManager from "../../../components/callManager/Call Manager";

import { useContext, useEffect, useState } from "react";
import {
  cancelFriendRequest,
  acceptFriendRequest,
} from "../../../services/users.service";
import { AppContext } from "../../../context/AppContext";
import { createPeer } from "../../../config/peer-config";
import { set } from "firebase/database";

function FriendsWindow() {
  const { updateUserData, user } = useContext(AppContext);
  const [peer, setPeer] = useState(null);

  const { startCall, endCall, currentCall, localStream } = CallManager({
    peer,
    userId: user.uid,
    onCallEnd: () => console.log("Call ended"),
  });

  useEffect(() => {
    const peerInstance = createPeer(user.uid);
    setPeer(peerInstance);

    return () => {
      peerInstance.destroy();
    };
  }, [user.uid, localStream]);

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
        peer={peer}
        currentCall={currentCall}
        onStartCall={startCall}
        onEndCall={endCall}
        handleCancelFriendRequest={handleCancelFriendRequest}
        handleAcceptFriendRequest={handleAcceptFriendRequest}
      ></FriendsBody>
    </div>
  );
}

export default FriendsWindow;
