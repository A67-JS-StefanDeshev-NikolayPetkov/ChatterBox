//Styles
import "./FriendsBody.css";

//Component imports
import AddFriendModal from "../AddFriendModal/AddFriendModal";
import AllFriends from "../../../../components/all-friends/AllFriends";
import PendingRequests from "../../../../components/pending-requests/PendingRequests";

import { useParams } from "react-router-dom";
function FriendsBody({ handleCancelFriendRequest, handleAcceptFriendRequest }) {
  const { filter } = useParams();
  return (
    <div className="friends-body">
      {filter === "add" && (
        <AddFriendModal
          handleCancelFriendRequest={handleCancelFriendRequest}
        ></AddFriendModal>
      )}
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
