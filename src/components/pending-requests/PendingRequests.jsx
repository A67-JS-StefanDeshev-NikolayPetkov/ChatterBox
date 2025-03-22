import "./PendingRequests.css";

//Component
import PendingRequest from "./PendingRequest/PendingRequest";

//Dependency
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

//Services
import { fetchUsersData } from "../../services/users.service";

function PendingRequests({
  handleCancelFriendRequest,
  handleAcceptFriendRequest,
}) {
  const { userData } = useContext(AppContext);
  const [sentRequestsData, setSentRequestsData] = useState(null);
  const [receivedRequestsData, setReceivedRequestsData] = useState(null);

  function fetchRequestsData() {
    const sentRequests = userData?.friendRequests?.sent
      ? Object.keys(userData.friendRequests.sent)
      : null;

    const receivedRequests = userData?.friendRequests?.received
      ? Object.keys(userData.friendRequests.received)
      : null;

    if (sentRequests)
      fetchUsersData(sentRequests).then((data) => setSentRequestsData(data));

    if (receivedRequests)
      fetchUsersData(receivedRequests).then((data) =>
        setReceivedRequestsData(data)
      );
  }

  useEffect(() => {
    fetchRequestsData();
    console.log("userdata was changed");
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log(receivedRequestsData);
  }, [receivedRequestsData]);

  return (
    <div className="pending-requests">
      <div className="requests-container">
        <h2>Received requests</h2>

        {receivedRequestsData ? (
          receivedRequestsData.map((request) => (
            <PendingRequest
              key={request.uid}
              request={request}
              handleAcceptFriendRequest={handleAcceptFriendRequest}
              handleCancelFriendRequest={handleCancelFriendRequest}
              fetchRequestsData={fetchRequestsData}
              type={"received"}
            />
          ))
        ) : (
          <p>No friend requests received.</p>
        )}
      </div>

      <div className="requests-container">
        <h2>Sent requests</h2>

        {sentRequestsData ? (
          sentRequestsData.map((request) => {
            return (
              <PendingRequest
                key={request.uid}
                request={request}
                handleCancelFriendRequest={handleCancelFriendRequest}
                fetchRequestsData={fetchRequestsData}
                type={"sent"}
              />
            );
          })
        ) : (
          <p>No friend requests sent.</p>
        )}
      </div>
    </div>
  );
}

export default PendingRequests;
