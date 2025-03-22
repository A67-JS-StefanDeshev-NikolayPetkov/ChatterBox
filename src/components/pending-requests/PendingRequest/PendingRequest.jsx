import "./PendingRequest.css";

import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

function PendingRequest({ request, handleRequest }) {
  const { user } = useContext(AppContext);

  return (
    <div className="pending-request">
      <div className="pending-request-details">
        <p>User: {request.username}</p>
        <p>Email: {request.email}</p>
      </div>
      <div className="pending-request-btns">
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
    </div>
  );
}

export default PendingRequest;
