import "./PendingRequestsBubble.css";

import { useContext } from "react";

import { AppContext } from "../../../context/AppContext";

function PendingRequestsBubble() {
  const { userData } = useContext(AppContext);

  if (userData?.friendRequests?.received)
    return (
      <div className="pending-friend-requests-bubble">
        {Object.keys(userData.friendRequests.received).length}
      </div>
    );
}

export default PendingRequestsBubble;
