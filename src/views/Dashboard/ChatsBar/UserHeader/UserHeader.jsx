//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faRightToBracket,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

//CSS
import "./UserHeader.css";

//Dependencies
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";

//Services
import {
  subscribeToStatus,
  updateUserStatus,
} from "../../../../services/users.service";

//Components imports
import StatusDropdown from "../../../../components/status-dropdown/StatusDropdown";
import Avatar from "../../../../components/avatar/Avatar";
import PendingRequestsBubble from "../../../../components/pending-requests/PendingRequestsBubble/PendingRequestsBubble";

function UserHeader() {
  const { user, userData, onLogout } = useContext(AppContext);
  const [status, setStatus] = useState(userData.details.status);
  const { filter } = useParams();

  const navigate = useNavigate();

  // useEffect(() => {
  //   updateUserStatus(user.uid, status);

  //   const unsubscribe = subscribeToStatus(user.uid, setStatus);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [status]);

  useEffect(() => {
    updateUserStatus(user.uid, status);

    const unsubscribe = subscribeToStatus(user.uid, setStatus);

    return () => {
      unsubscribe();
    };
  }, [status]);

  const handleStatus = (option) => setStatus(option);

  return (
    <div className="user-header">
      <div className="user-header-details">
        <Avatar
          className="user-image"
          status={status}
          type={"user"}
          imageUrl={userData.details.profilePicture || "default-avatar.png"}
        ></Avatar>
        <div className="user-status">
          <p className="username">{userData.details.username}</p>
          <StatusDropdown
            handleStatus={handleStatus}
            status={status}
            options={["online", "away", "busy", "offline"]}
          ></StatusDropdown>
        </div>
      </div>
      <div className="user-btns">
        <FontAwesomeIcon
          icon={faUsers}
          className="icon-btn"
          onClick={() => {
            if (!filter) navigate(`/${user.uid}/friends/all`);
          }}
        ></FontAwesomeIcon>
        <PendingRequestsBubble></PendingRequestsBubble>
        {/* <FontAwesomeIcon
          icon={faRightToBracket}
          className="icon-btn"
          onClick={handleLogout}
        ></FontAwesomeIcon> */}
        <FontAwesomeIcon
          icon={faEdit}
          className="icon-btn edit-profile-btn"
          onClick={() => navigate(`/${user.uid}/friends/settings`)}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default UserHeader;
