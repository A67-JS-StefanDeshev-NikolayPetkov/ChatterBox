//Styles
import "./FriendsBody.css";


import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
//Component imports
import AddFriendModal from "../AddFriendModal/AddFriendModal";
import AllFriends from "../../../../components/all-friends/AllFriends";
import PendingRequests from "../../../../components/pending-requests/PendingRequests";
import UserSettings from "../../../../views/UserSettings/UserSettings";
import FriendPreview from "../../../../components/friend-preview/FriendPreview";

import { useParams } from "react-router-dom";
function FriendsBody({ 
  peer,
  currentCall,
  onStartCall,
  onEndCall,
  handleCancelFriendRequest,
  handleAcceptFriendRequest,
}) {
  const { filter } = useParams();
  const { userData } = useContext(AppContext);

  return (
    <div className="friends-body">
      {filter === "settings" && 
      <UserSettings></UserSettings>}
      {filter === "add" && (
        <AddFriendModal
          handleCancelFriendRequest={handleCancelFriendRequest}
        ></AddFriendModal>
      )}
      {filter === "online" && <AllFriends filtered={true}></AllFriends>}
      {filter === "pending" && (
        <PendingRequests
          handleCancelFriendRequest={handleCancelFriendRequest}
          handleAcceptFriendRequest={handleAcceptFriendRequest}
        />
      )}
      {filter === "all" &&
        userData.friends &&
        Object.keys(userData.friends).map((friendId) => (
          <FriendPreview
            key={friendId}
            friend={{ uid: friendId, ...userData.friends[friendId] }}
            onStartVideoCall={() => onStartCall(friendId, true)}
            onStartAudioCall={() => onStartCall(friendId, false)}
          />
        ))}
      <div className="video-call-container">
        <video id="local-video" autoPlay muted className="local-video" />
        <video id="remote-video" autoPlay className="remote-video" />
      </div>
      {currentCall && <button onClick={onEndCall}>End Call</button>}
    </div>
  );
}

export default FriendsBody;
