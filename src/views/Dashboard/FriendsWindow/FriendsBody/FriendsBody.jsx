//Styles
import "./FriendsBody.css";

//Component imports
import AddFriendModal from "../AddFriendModal/AddFriendModal";
import AllFriends from "../../../../components/all-friends/AllFriends";
import PendingRequests from "../../../../components/pending-requests/PendingRequests";
import UserSettings from "../../../../views/UserSettings/UserSettings";

import { useParams } from "react-router-dom";
function FriendsBody({ handleCancelFriendRequest, handleAcceptFriendRequest }) {
  const { filter } = useParams();
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
      {filter === "all" && <AllFriends></AllFriends>}
    </div>
  );
}

export default FriendsBody;
