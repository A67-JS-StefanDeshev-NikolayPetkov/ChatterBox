//Styles
import "./FriendsBody.css";

//Dependency imports
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";

//Component imports
import AddFriendModal from "../AddFriendModal/AddFriendModal";
import AllFriends from "../../../../components/all-friends/AllFriends";
import PendingRequests from "../../../../components/pending-requests/PendingRequests";
function FriendsBody({ openWindow }) {
  const { userData } = useContext(AppContext);

  if (!userData.friends)
    return (
      <div className="friends-body">
        {openWindow === "add" && <AddFriendModal></AddFriendModal>}
        {openWindow === "pending" && <PendingRequests />}
        {openWindow === "all" && <AllFriends></AllFriends>}
      </div>
    );
}

export default FriendsBody;
