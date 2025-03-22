import "./PendingRequest.css";

import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";

function PendingRequest({
  request,
  handleCancelFriendRequest,
  handleAcceptFriendRequest,
  fetchRequestsData,
  type,
}) {
  const { user } = useContext(AppContext);

  return (
    <div className="pending-request">
      <div className="pending-request-details">
        <p>User: {request.username}</p>
        <p>Email: {request.email}</p>
      </div>
      <div className="pending-request-btns">
        {type === "received" && (
          <FontAwesomeIcon
            icon={faPlusSquare}
            className={"icon-btn icon-big"}
            onClick={() => {
              handleAcceptFriendRequest(request.uid, user.uid);
              fetchRequestsData();
            }}
          >
            Accept
          </FontAwesomeIcon>
        )}
        <FontAwesomeIcon
          icon={faMinusSquare}
          className={"icon-btn icon-big"}
          onClick={() => {
            type === "sent"
              ? handleCancelFriendRequest(user.uid, request.uid)
              : handleCancelFriendRequest(request.uid, user.uid);
            fetchRequestsData();
          }}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default PendingRequest;
