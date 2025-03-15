//Misc
import "./UserPreview.css";

//Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

//Components
import Avatar from "../avatar/Avatar";

function UserPreview({ user }) {
  return (
    <div className="user-container">
      <div className="friend-details">
        <Avatar
          imgUrl={user.imageUrl ? user.imageUrl : null}
          type="user-image"
        ></Avatar>
        <div className="user-details">
          <p className="user-name">Username: {user.username}</p>
          <p className="user-name">Email: {user.email}</p>
        </div>
      </div>
      <div className="friend-actions">
        <FontAwesomeIcon
          className="icon-btn icon-big"
          icon={faPlusSquare}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default UserPreview;
