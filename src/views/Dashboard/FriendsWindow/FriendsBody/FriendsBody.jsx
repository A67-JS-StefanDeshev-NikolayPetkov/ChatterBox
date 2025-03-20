//Styles
import "./FriendsBody.css";

//Component imports
import AddFriendModal from "../AddFriendModal/AddFriendModal";
import AllFriends from "../../../../components/all-friends/AllFriends";
import PendingRequests from "../../../../components/pending-requests/PendingRequests";
function FriendsBody({
  openWindow,
  handleCancelFriendRequest,
  handleAcceptFriendRequest,
}) {
  return (
    <div className="friends-body">
      {openWindow === "add" && (
        <AddFriendModal
          handleCancelFriendRequest={handleCancelFriendRequest}
        ></AddFriendModal>
      )}
      {openWindow === "pending" && (
        <PendingRequests
          handleCancelFriendRequest={handleCancelFriendRequest}
          handleAcceptFriendRequest={handleAcceptFriendRequest}
        />
      )}
      {openWindow === "all" && <AllFriends></AllFriends>}
    </div>
  );
}

export default FriendsBody;
