import "./PendingRequests.css";

//Component
import PendingRequest from "./PendingRequest/PendingRequest";

//Dependency
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function PendingRequests() {
  const { userData } = useContext(AppContext);
  return (
    <div className="pending-requests">
      <div className="received-requests">
        <h2>Received requests</h2>

        {userData?.friendRequests?.received ? (
          Object.entries(userData.friendRequests.received).map((request) => (
            <PendingRequest
              key={request[0]}
              request={request[1]}
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
              request={request[1]}
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
