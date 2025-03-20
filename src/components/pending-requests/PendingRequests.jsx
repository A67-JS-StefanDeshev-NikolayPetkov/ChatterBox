import "./PendingRequests.css";

//Component
import PendingRequest from "./PendingRequest/PendingRequest";

//Dependency
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

function PendingRequests({
  handleCancelFriendRequest,
  handleAcceptFriendRequest,
}) {
  const { userData } = useContext(AppContext);
  useEffect(() => console.log("pending user data", userData), [userData]);
  useEffect(() => console.log(handleCancelFriendRequest));

  return (
    <div className="pending-requests">
      <div className="received-requests">
        <h2>Received requests</h2>

        {userData?.friendRequests?.received ? (
          Object.entries(userData.friendRequests.received).map((request) => (
            <PendingRequest
              key={request[0]}
              request={{ ...request[1], uid: request[0] }}
              handleRequest={handleAcceptFriendRequest}
            />
          ))
        ) : (
          <p>No friend requests received.</p>
        )}
      </div>

      <div className="sent-requests">
        <h2>Sent requests</h2>
        {userData?.friendRequests?.sent ? (
          Object.entries(userData.friendRequests.sent).map((request) => (
            <PendingRequest
              key={request[0]}
              request={{ ...request[1], uid: request[0] }}
              handleRequest={handleCancelFriendRequest}
            />
          ))
        ) : (
          <p>No friend requests sent.</p>
        )}
      </div>
    </div>
  );
}

export default PendingRequests;
