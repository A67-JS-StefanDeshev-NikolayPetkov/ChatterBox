import "./PendingRequest.css";

import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

function PendingRequest({ request, handleRequest }) {
  const { user } = useContext(AppContext);
  useEffect(() => console.log(handleRequest));

  return (
    <div className="pending-request">
      <p>User: {request.username}</p>
      <p>Email: {request.email}</p>
      {handleRequest.name === "handleAcceptFriendRequest" && (
        <button
          onClick={() => {
            handleRequest(request.uid, user.uid);
          }}
        >
          Accept
        </button>
      )}
      {handleRequest.name === "handleCancelFriendRequest" && (
        <button
          onClick={() => {
            handleRequest(user.uid, request.uid);
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
}

export default PendingRequest;
